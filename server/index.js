const express = require("express");
const { mongoURI } = require("./config/keys");

require("./models/User");
require("./services/passport");

const mongoose = require("mongoose");

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (err) {
    return console.log("mongoose contecction error:", err);
  }
  console.log("Connected to Mongo DB");
});

const app = express();

app.get("/", (req, res) => {
  res.send({
    banknotes: "test"
  });
});

const authRoutes = require("./routes/authRoutes");
authRoutes(app);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log("listening on port 7000"));
