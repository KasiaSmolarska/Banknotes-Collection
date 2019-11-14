const express = require("express");
const app = express();

const cookieSession = require("cookie-session");

const { mongoURI, cookieKey } = require("./config/keys");
require("./models/User");

// MONGOOSE
const mongoose = require("mongoose");

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (err) {
    return console.log("mongoose contecction error:", err);
  }
  console.log("Connected to Mongo DB");
});

// PASSPORT
const passport = require("passport");
require("./services/passport");
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dni
    keys: [cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/authRoutes");
authRoutes(app);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log("listening on port 7000"));
