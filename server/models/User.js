const mongoose = require("mongoose");
const { Schema } = mongoose;
const uuidv1 = require("uuid/v1");

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
  email: String,
  password: String,
  resetPasswordToken: {
    type: String,
    required: false
  },

  resetPasswordExpires: {
    type: Date,
    required: false
  }
});

userSchema.methods.generatePasswordReset = function() {
  const uuid = uuidv1();
  this.resetPasswordToken = uuid;
  console.log(uuid)
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

mongoose.model("users", userSchema);
