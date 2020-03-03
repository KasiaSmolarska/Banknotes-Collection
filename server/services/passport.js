const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");

const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser(function(user, done) {
  console.log("user.id", user.id);
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
      if (profile.provider !== "google") {
        console.log("Provider issue.");
        return done(null, false, { message: "Provider issue." });
      }
      console.log(profile.photos[0].value);
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        console.log("User already exists in collection.");
        if (!existingUser.familyName || !existingUser.given_name) {
          const user = await User.findOneAndUpdate(
            { googleId: profile.id },
            {
              $set: {
                familyName: profile.name.familyName,
                given_name: profile.name.givenName
              }
            },
            { new: true }
          );
          return done(null, user);
        }
        if (!existingUser.picture) {
          const user = await User.findOneAndUpdate(
            { googleId: profile.id },
            {
              $set: {
                picture: profile.photos[0].value
              }
            },
            { new: true }
          );
          return done(null, user);
        }
        return done(null, existingUser);
      }
      new User({
        googleId: profile.id,
        familyName: profile.name.familyName || "",
        given_name: profile.name.givenName || "",
        picture: profile.photos[0].value
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
      console.log(profile);
      const existingUser = await User.findOne({ facebookId: profile.id });
      if (existingUser) {
        console.log("User already exists in collection.");

        if (!existingUser.familyName || !existingUser.given_name) {
          const user = await User.findOneAndUpdate(
            { facebookId: profile.id },
            {
              $set: {
                familyName: profile.name.familyName || profile.displayName,
                given_name: profile.name.givenName || profile.displayName
              }
            },
            { new: true }
          );
          return done(null, user);
        }
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
