const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Banknote = mongoose.model("banknotes");

module.exports = app => {
  app.post("/api/banknotes", requireLogin, async (req, res) => {
    let banknoteData = {
      _user: req.user.id
    };

    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        const banknoteFieldData = req.body[key];
        banknoteData[key] = banknoteFieldData;
      }
    }

    await new Banknote(banknoteData).save((err, banknote) => {
      if (err) {
        res.send({ error: err });
      }
      res.send({ status: "banknote was added to you collection" });
    });
  });
};
