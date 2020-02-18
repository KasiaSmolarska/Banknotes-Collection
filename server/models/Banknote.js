const mongoose = require("mongoose");
const { Schema } = mongoose;

const banknoteData = {
  _user: { type: "ObjectId", ref: "users" },
  dateCreated: { type: "Date" },
  continent: {
    type: "String",
    enum: ["Africa", "Antarctica", "Asia", "Australia", "Europe", "North America", "South America"]
  },
  country: {
    type: "String",
    maxlength: 2,
    validate: /[A-Z]{2}/
  },
  own: {
    type: "Boolean",
    default: false
  },
  currency: {
    type: "String",
    maxlength: 3,
    validate: /[A-Z]{2,3}/
  },
  value: {
    type: "Number"
  },
  pickNumber: { type: "String" },
  tbbPickNumber: { type: "String" },
  countryPickNumber: { type: "String" },
  series: { type: "String" },
  issueBank: { type: "ObjectId", ref: "issueBanks" },
  issueYear: {
    type: "Number"
  },
  title: {
    type: "String",
    required: true,
    maxlength: 255
  },
  observe: {
    type: "String",
    maxlength: 500
  },
  reverse: {
    type: "String",
    maxlength: 500
  },
  textOnNote: {
    type: "String",
    maxlength: 500
  },
  userNotes: {
    type: "String",
    maxlength: 500
  },
  type: {
    type: "String",
    enum: ["Paper", "Polymer"]
  },
  width: {
    type: "Number"
  },
  height: {
    type: "Number"
  },
  signatures: { type: "String" },
  serialNumber: { type: "String" },
  condition: {
    type: "String",
    enum: ["UNC", "-UNC", "AU", "XF/EF", "VF", "F", "VG", "G", "FAIR", "P"]
  },
  purchaseDate: {
    type: "Date"
  },
  currencyPaid: {
    type: "String",
    maxlength: 3,
    validate: /[A-Z]{2,3}/
  },
  pricePaid: {
    type: "Number"
  },
  imageFront: { type: "String" },
  imageReverse: { type: "String" },
  favorite: {
    type: "Boolean",
    default: false
  }
};

const BanknoteSchema = new Schema(banknoteData);

mongoose.model("banknotes", BanknoteSchema);

module.exports = banknoteData;
