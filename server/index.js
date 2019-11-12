const express = require("express");
const app = express();

const { mongoURI } = require("./config/keys");
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
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send({
    banknotes: "test"
  });
});

const authRoutes = require("./routes/authRoutes");
authRoutes(app);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log("listening on port 7000"));
