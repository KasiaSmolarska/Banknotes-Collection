const passport = require("passport");
const mongoose = require("mongoose");
const md5 = require("md5");
const { check } = require("express-validator");
const Sendgrid = require("../services/sendgrid");

const User = mongoose.model("users");

module.exports = app => {
  app.post("/auth/login", function(req, res, next) {
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return next(err); // will generate a 500 error
      }
      if (!user) {
        return res.status(401).send({ success: false, message: "authentication failed" });
      }

      if(!user.confirmed){
        return res.status(409).send({ success: false, message: "user email is not confirmed" });
      }

      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.send({ user });
      });
    })(req, res, next);
  });

  app.post("/auth/register", async (req, res) => {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(409).json({
          msg: "Not all of the required field is filled!"
        });
      }

      if (req.body.password !== req.body.password2) {
        return res.status(409).json({
          msg: "Passwords are not the same!"
        });
      }

      let user = await User.findOne({ email: req.body.email, googleId: null, facebookId: null });
      if (user) {
        return res.status(422).json({
          msg: "That email is already registered!"
        });
      }

      new User({
        googleId: null,
        facebookId: null,
        familyName: req.body.familyName || "",
        given_name: req.body.givenName || "",
        email: req.body.email,
        password: md5(req.body.password)
      }).save((err, data) => {
        if (err) {
          console.log(err);
        } else {
          const dataToSend = { ...data._doc };
          delete dataToSend.password;
          res.send({ user: dataToSend });
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google", { session: true, failureRedirect: "/login" }), (req, res) => {
    res.redirect("/dashboard");
  });

  app.get("/auth/facebook", passport.authenticate("facebook"));

  //CONFIRM account
  app.post(
    "/api/auth/confirm",
    Sendgrid.confirmPassword,
    function(req, res) {
      console.log(req.body);
    }
  );

  app.get(
    "/api/auth/confirm/:token",
    Sendgrid.confirmAccountToken
  );

  //Password RESET
  app.post(
    "/auth/recover",
    [
      check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
    ],
    Sendgrid.recover,
    function(req, res) {
      console.log(req.body);
    }
  );

  app.get("/api/auth/reset/:token", Sendgrid.reset);

  app.post(
    "/api/auth/reset/:token",
    [
      check("password")
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage("Must be at least 6 chars long"),
      check("password2", "Passwords do not match").custom((value, { req }) => value === req.body.password)
    ],
    Sendgrid.resetPassword
  );

  app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), function(req, res) {
    res.redirect("/dashboard");
  });

  app.get("/api/current_user", ({ user }, res) => {
    if (user) {
      const { _id, googleId, picture, familyName, given_name } = user;
      const newUser = { _id, googleId, picture, familyName, given_name };
      return res.send({ user: newUser });
    }

    res.send({ user });
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    // logout() is a passport method which clean a user cookie
    res.send({ user: req.user });
  });
};
