const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const banknoteData = require("../models/Banknote");

const Banknote = mongoose.model("banknotes");

module.exports = app => {
  app.get("/api/banknote", requireLogin, (req, res) => {
    res.send(banknoteData);
  });

  app.post("/api/banknote", requireLogin, async (req, res) => {
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
        console.log(err);
        return res.status(422).send(err);
      }
      res.send({ status: "banknote was added to you collection" });
    });
  });
};
