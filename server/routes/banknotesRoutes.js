const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const multer = require("multer");

const path = require("path");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.resolve(__dirname, "..", "uploads", "images"));
  },
  filename: function(req, file, cb) {
    cb(null, Date.now().toString() + "-" + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: function(req, file, cb) {
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: File upload only supports the following filetypes - " + filetypes);
  }
});

const banknoteData = require("../models/Banknote");

const Banknote = mongoose.model("banknotes");

module.exports = app => {
  app.post("/api/upload/image", upload.single("file"), (req, res) => {
    if (req.file) {
      res.send(req.file.filename);
    } else throw "error";
  });

  app.get("/api/upload/image/:image", requireLogin, (req, res) => {
    const { image } = req.params;
    const imageUrl = path.resolve(__dirname, "..", "uploads", "images", image);

    fs.readFile(imageUrl, (err, data) => {
      if (err) {
        return res.status("404").send(err);
      }
      const imageUrlParts = imageUrl.split(".");
      const imageExtension = imageUrlParts[imageUrlParts - 1];

      res.set({ "Content-Type": `image/${imageExtension}` });

      res.send(data);
    });
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
