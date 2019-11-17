const mongoose = require("mongoose");
const { Schema } = mongoose;

const BanknoteSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "users" },
  dateCreated: { type: Date, default: new Date() },
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
  currency: {
    type: String,
    maxlength: 3,
    validate: /[A-Z]{2,3}/
  },
  value: Number,
  pickNumber: String,
  tbbPickNumber: String,
  countryPickNumber: String,
  series: String,
  issueBank: { type: Schema.Types.ObjectId, ref: "issueBanks" },
  issueYear: Number,
  title: {
    type: String,
    required: true,
    maxlength: 255
  },
  observe: {
    type: String,
    maxlength: 500
  },
  reverse: {
    type: String,
    maxlength: 500
  },
  textOnNote: {
    type: String,
    maxlength: 500
  },
  userNotes: {
    type: String,
    maxlength: 500
  },
  type: {
    type: String,
    enum: ["Paper", "Polymer"]
  },
  width: Number,
  height: Number,
  signatues: String,
  serialNumber: String,
  condition: {
    type: String,
    enum: ["UNC", "-UNC", "AU", "XF/EF", "VF", "F", "VG", "G", "FAIR", "P"]
  },
  purchaseDate: Date,
  currencyPaid: {
    type: String,
    maxlength: 3,
    validate: /[A-Z]{2,3}/
  },
  pricePaid: {
    type: String,
    maxlength: 32
  },
  imageFront: String,
  imageReverse: String
});

mongoose.model("banknotes", BanknoteSchema);
