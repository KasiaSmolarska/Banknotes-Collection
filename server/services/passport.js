const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");

const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => console.log(err));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      proxy: true,
      resave: false
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("google", accessToken);
      if (profile.provider !== "google") {
        return done(null, false, { message: "Provider issue." });
      }
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        console.log("User already exists in collection.");
        return done(null, existingUser);
      }

      new User({
        googleId: profile.id
      }).save((err, user) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Account is successfully created");
        }
        done(null, user);
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: "/auth/facebook/callback"
    },
    async function(accessToken, refreshToken, profile, done) {
      if (profile.provider !== "facebook") {
        return done(null, false, { message: "Provider issue." });
      }
      const existingUser = await User.findOne({ facebookId: profile.id });
      if (existingUser) {
        console.log("User already exists in collection.");
        return done(null, existingUser);
      }
      new User({
        facebookId: profile.id
      }).save((err, user) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Account is successfully created");
        }
        done(null, user);
      });
    }
  )
);
