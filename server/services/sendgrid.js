const mongoose = require("mongoose");
const User = mongoose.model("users");
const md5 = require("md5");

const sgMail = require("@sendgrid/mail");
const keys = require("../config/keys");
sgMail.setApiKey(keys.sendgridApiKey);

const { passwordRecover } = require("../emailTemplates/passwordRecover");
const { emailResetSuccess } = require("../emailTemplates/emailResetSuccess");
const { confirmYourAccount } = require("../emailTemplates/confirmYourAccount");

// ===CONFIRM ACCOUT AFTER REGISTRATION

// @route POST api/auth/confirm
// @desc Confirm Email Address - Generates token and Sends password confirmation email
// @access Public

exports.confirmPassword = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user.confirmAccountExpires > new Date(Date.now())) {
        return res.status(200).json({ label: "tokenAlreadySent", message: "Token has been already sent, please check your spam folder if you didn't get it." });
      }

      if (user.confirmed) {
        return res.status(200).json({ label: "accountConfirmed", message: "Account has been already confirmed!" });
      }

      //Generate and set confirmation token
      user.generateAccountConfirm();

      // Save the updated user object
      user
        .save()
        .then(user => {
          // send email
          let link = "http://" + req.headers.host + "/api/auth/confirm/" + user.confirmAccountToken;
          const { lang } = req.body;
          const confirmTemplate = confirmYourAccount(user.given_name, link);
          const mailOptions = {
            to: user.email,
            from: keys.sendgridFromMail,
            subject: confirmTemplate.subject[lang],
            content: [
              {
                type: "text/html",
                value: confirmTemplate.text[lang]
              }
            ]
          };
          sgMail.send(mailOptions, (error, result) => {
            if (error) {
              return res.status(500).json({ message: error.message });
            }
            res.status(200).json({ label: "emailSent", message: "A confirmation email has been sent to " + user.email + "." });
          });
        })
        .catch(err => res.status(500).json({ message: err.message }));
    })
    .catch(err => res.status(500).json({ message: err.message }));
  };

  // @route GET api/auth/confirm
  // @desc Confirm Email Address - checking if the token is valid and accept or reject confrmation
  // @access Public
  exports.confirmAccountToken = (req, res) => {
    User.findOne({ confirmAccountToken: req.params.token, confirmAccountExpires: { $gt: Date.now() } })
      .then(user => {
        console.log(req.params.token)
        if (!user) {
          return res.status(401).json({ message: "Account confirm token is invalid or has expired." });
        }

        if (user.confirmed) {
          return res.status(200).json({ label: "accountConfirmed", message: "Account has been already confirmed!" });
        }

        user.confirmAccountToken = undefined;
        user.confirmAccountExpires = undefined;
        user.confirmed = true;

        // Save
        user.save(err => {
          if (err) {
            return res.status(500).json({ message: err.message });
          }

          res.status(200).redirect("/dashboard#account-confirmed");
        });
      })
      .catch(err => res.status(500).json({ message: err.message }));
  };

// ===PASSWORD RECOVER AND RESET

// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public
exports.recover = (req, res) => {
  User.findOne({ email: req.body.email, googleId: null, facebookId: null})
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: "The email address " + req.body.email + " is not associated with any account. Double-check your email address and try again." });
      }

      if (user.resetPasswordExpires > new Date(Date.now())) {
        return res.status(200).json({ label: "tokenAlreadySent", message: "Token has been already sent, please check your spam folder." });
      }

      //Generate and set password reset token
      user.generatePasswordReset();

      // Save the updated user object
      user
        .save()
        .then(user => {
          // send email
          let link = "http://" + req.headers.host + "/auth/reset/" + user.resetPasswordToken;
          const { lang } = req.body;
          const recoverTemplate = passwordRecover(user.given_name, link);
          const mailOptions = {
            to: user.email,
            from: keys.sendgridFromMail,
            subject: recoverTemplate.subject[lang],
            content: [
              {
                type: "text/html",
                value: recoverTemplate.text[lang]
              }
            ]
          };
          sgMail.send(mailOptions, (error, result) => {
            if (error) {
              return res.status(500).json({ message: error.message });
            }
            res.status(200).json({ label: "emailSent", message: "A reset email has been sent to " + user.email + "." });
          });
        })
        .catch(err => res.status(500).json({ message: err.message }));
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

// @route GET api/auth/reset
// @desc Reset Password - ValidatePassword reset token and shows the password reset view
// @access Public
exports.reset = (req, res) => {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
    .then(user => {
      if (!user) return res.status(401).json({ message: "Password reset token is invalid or has expired." });
      //Redirect user to form with the email address
      res.json({ user });
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

// @route POST api/auth/reset
// @desc Reset Password
// @access Public
exports.resetPassword = (req, res) => {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }).then(user => {
    if (!user) return res.status(401).json({ message: "Password reset token is invalid or has expired." });

    if (user.email !== req.body.email) {
      return res.status(409).json({ message: "Passed email is not correct!" });
    }

    if (req.body.password2 !== req.body.password) {
      return res.status(422).json({ message: "The passwords you have entered do not match!" });
    }

    //Set the new password
    user.password = md5(req.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save
    user.save(err => {
      if (err) return res.status(500).json({ message: err.message });
      const resetTemplate = emailResetSuccess(user.given_name, user.email);
      const { lang } = req.body;

      // send email
      const mailOptions = {
        to: user.email,
        from: keys.sendgridFromMail,
        subject: resetTemplate.subject[lang],
        content: [
          {
            type: "text/html",
            value: resetTemplate.text[lang]
          }
        ]
      };

      sgMail.send(mailOptions, (error, result) => {
        if (error) return res.status(500).json({ message: error.message });

        res.status(200).json({ message: "Your password has been updated." });
      });
    });
  });
};
