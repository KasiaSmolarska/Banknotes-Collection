const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const multer = require("multer");

const path = require("path");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.resolve(__dirname, "..", "uploads", "images"));
  },
  filename: function(req, file, cb) {
    cb(null, Date.now().toString() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

const banknoteData = require("../models/Banknote");

const Banknote = mongoose.model("banknotes");

module.exports = app => {
  app.post("/api/upload/image", upload.single("file"), (req, res) => {
    if (req.file) {
      res.send(req.file);
    } else throw "error";
  });

  app.get("/api/banknote", requireLogin, (req, res) => {
    let frondEndBankoteData = {};
    for (const key in banknoteData) {
      if (banknoteData.hasOwnProperty(key)) {
        const element = banknoteData[key];

        if (key === "_user" || key === "dateCreated") {
          continue;
        }

        frondEndBankoteData[key] = { ...element };

        if (element.validate) {
          frondEndBankoteData[key].validate = element.validate.source;
        }
      }
    }
    res.send(frondEndBankoteData);
  });

  app.post("/api/banknote", requireLogin, async (req, res) => {
    let banknoteData = {
      _user: req.user.id,
      dateCreated: new Date()
    };
    //console.log(req.body);
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
