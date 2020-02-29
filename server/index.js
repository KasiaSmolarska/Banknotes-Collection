const express = require("express");

const app = express();

const { mongoURI, cookieKey } = require("./config/keys");

const compression = require('compression')


// Body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

// MODELS
require("./models/User");
require("./models/Banknote");
require("./models/IssueBank");

// MONGOOSE
const mongoose = require("mongoose");

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, err => {
  if (err) {
    return console.log("mongoose contecction error:", err);
  }
  console.log("Connected to Mongo DB");
});

// SESSION
const cookieSession = require("cookie-session");

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dni
    keys: [cookieKey]
  })
);

// PASSPORT
const passport = require("passport");
require("./services/passport");
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
const authRoutes = require("./routes/authRoutes");
authRoutes(app);
const bankRoutes = require("./routes/banknotesRoutes");
bankRoutes(app);
const statisticsRoutes = require("./routes/statisticsRoutes");
statisticsRoutes(app);


// COMPRESSION

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
  return true;
}

app.use(compression({ threshold: 0, filter: shouldCompress }));


// DEPLOY
const path = require("path");
app.use(express.static(path.resolve(__dirname, "..", "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

// PORT
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log("listening on port 7000"));
