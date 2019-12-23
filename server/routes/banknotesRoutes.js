const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const imageThumbnail = require("image-thumbnail");

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
const IssueBank = mongoose.model("issueBanks");

module.exports = app => {
  app.post("/api/upload/image", upload.single("file"), async (req, res) => {
    if (req.file) {
      const directoryPath = path.resolve(__dirname, "..", "uploads", "images");
      const imageUrl = path.resolve(directoryPath, req.file.filename);
      const imageBuffer = fs.readFileSync(imageUrl);
      const options = { width: 100, height: 100, jpegOptions: { force: true, quality: 90 } };

      const thumbName = `thumb-${req.file.filename}`;
      const thumbUrl = path.resolve(directoryPath, thumbName);

      await imageThumbnail(imageBuffer, options).then(thumbnail => fs.writeFile(thumbUrl, thumbnail, err => console.log(err)));
      res.send(req.file.filename);
    } else {
      res.status(500).send({ error: "Uploading file problem" });
    }
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

  app.post("/api/issuebank", requireLogin, async (req, res) => {
    const search = req.body.value;

    if (search.length > 2) {
      const foundedBanks = await IssueBank.find({ name: new RegExp(`.*${search}.*`, "i"), _user: req.user.id });
      return res.send(foundedBanks);
    }
    res.send("The query is too short");
  });

  app.get("/api/banknoteModel", requireLogin, (req, res) => {
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

  app.get("/api/banknote", requireLogin, async (req, res) => {
    const banknoteList = await Banknote.find({ _user: req.user.id });
    res.send(banknoteList);
  });

  app.post("/api/banknote", requireLogin, async (req, res) => {
    let banknoteData = {
      _user: req.user.id,
      dateCreated: new Date()
    };

    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        const banknoteFieldData = req.body[key];

        if (key === "issueBank") {
          const existingIssueBank = await IssueBank.findOne({ name: banknoteFieldData, _user: req.user.id });

          if (existingIssueBank) {
            console.log(`You have already have bank ${existingIssueBank.name} in your collection`);
            banknoteData[key] = existingIssueBank.id;
            continue;
          }

          let issueBankData = {
            _user: req.user.id,
            name: banknoteFieldData
          };
          await new Promise((resolve, reject) =>
            new IssueBank(issueBankData).save((err, issueBank) => {
              if (err) {
                console.log(err);
                resolve();
                return res.status(422).send(err);
              }
              banknoteData[key] = issueBank.id;
              resolve();
            })
          );
        } else {
          banknoteData[key] = banknoteFieldData;
        }
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
