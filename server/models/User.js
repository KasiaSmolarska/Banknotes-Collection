const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  dateCreated: { type: Date, default: new Date().toJSON() }
});

mongoose.model("users", userSchema);
