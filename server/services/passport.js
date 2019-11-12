const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");

const keys = require("../config/keys");

const User = mongoose.model("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("google", accessToken);
      if (profile.provider !== "google") {
        return done(null);
      }
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        console.log("User already exists in collection.");
        return done(null, existingUser);
      }

      new User({
        googleId: profile.id
      }).save(err => {
        if (err) {
          return console.log(err);
        }
        console.log("Account is successfully created");
      });
      done();
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
        return done(null);
      }
      const existingUser = await User.findOne({ facebookId: profile.id });
      if (existingUser) {
        console.log("User already exists in collection.");
        return done(null, existingUser);
      }
      new User({
        facebookId: profile.id
      }).save(err => {
        if (err) {
          return console.log(err);
        }
        console.log("Account is successfully created");
      });
      done();
    }
  )
);
