const express = require("express");

const app = express();

const cookieSession = require("cookie-session");

const { mongoURI, cookieKey } = require("./config/keys");

// Body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

//app.use(express.static("../client/build"));

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// MODELS
require("./models/User");
require("./models/Banknote");
require("./models/IssueBank");

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
const bankRoutes = require("./routes/banknotesRoutes");
bankRoutes(app);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log("listening on port 7000"));
