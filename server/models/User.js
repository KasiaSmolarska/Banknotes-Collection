const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  given_name: String,
  familyName: String,
  picture: String,
  dateCreated: {
    type: Date,
    default: new Date()
  },
  active: {
    default: true,
    type: Boolean,
    required: true
  },
  email: String
});

mongoose.model("users", userSchema);
