const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "users" },
  continent: {
    type: "String",
    enum: ["Africa", "Antarctica", "Asia", "Australia", "Europe", "North America", "South America"]
  },
  country: {
    type: String,
    maxlength: 2,
    validate: /[A-Z]{2}/
  },
  own: {
    type: Boolean,
    default: false
  },
  pickNumber: String,
  tbbPickNumber: String,
  countryPickNumner: String,
  series: String,
  issueBank: String,
  issueYear: Number,
  title: {
    type: String,
    required: true,
    maxlength: 200
  }
});

mongoose.model("banknotes", userSchema);
