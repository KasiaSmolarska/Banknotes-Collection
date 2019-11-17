const mongoose = require("mongoose");
const { Schema } = mongoose;

const IssueBankSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: "users" },
  name: {
    type: String,
    maxlength: 255
  }
});

mongoose.model("issueBanks", IssueBankSchema);
