const mongoose = require("mongoose");
const User = mongoose.model("users");
const md5 = require("md5");

const sgMail = require("@sendgrid/mail");
const keys = require("../config/keys");
sgMail.setApiKey(keys.sendgridApiKey);

const {passwordRecover} = require("../emailTemplates/passwordRecover");
const {emailResetSuccess} = require("../emailTemplates/emailResetSuccess");

// ===PASSWORD RECOVER AND RESET

// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public
exports.recover = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      console.log("sendgridApiKey", keys.sendgridApiKey);
      if (!user) return res.status(401).json({ message: "The email address " + req.body.email + " is not associated with any account. Double-check your email address and try again." });
      //Generate and set password reset token
      user.generatePasswordReset();

      // Save the updated user object
      user
        .save()
        .then(user => {
          // send email
          let link = "http://" + req.headers.host + "/auth/reset/" + user.resetPasswordToken;
          const {lang} = req.body;
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
            res.status(200).json({ message: "A reset email has been sent to " + user.email + "." });
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

    if(user.email !== req.body.email){
      return res.status(409).json({ message: "Passed email is not correct!" });
    }

    if(req.body.password2 !== req.body.password){
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
      const {lang} = req.body;

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
