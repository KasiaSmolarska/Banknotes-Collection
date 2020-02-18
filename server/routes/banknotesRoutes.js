const mongoose = require("mongoose");
const https = require("https");
const requireLogin = require("../middlewares/requireLogin");
const imageThumbnail = require("image-thumbnail");

// const uuidv1 = require("uuid/v1");

const multer = require("multer");

const path = require("path");
const fs = require("fs");

const admin = require("firebase-admin");

const { serviceAccount } = require("../config/keys");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `${serviceAccount.project_id}.appspot.com`
});

var firebaseStorage = admin.storage();

var bucket = firebaseStorage.bucket();

var storage = multer.memoryStorage();

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
const PUBLIC_FILE = {
  entity: "allUsers",
  role: "READER"
};
module.exports = app => {
  app.post("/api/upload/image", upload.single("file"), async (req, res) => {
    if (req.file) {
      const directoryPath = path.resolve(__dirname, "..", "uploads", "images");

      const imageBuffer = req.file.buffer;
      const options = { width: 100, height: 100, jpegOptions: { force: true, quality: 90 } };

      const thumbName = `thumb-${req.file.originalname}`;

      await imageThumbnail(imageBuffer, options).then(thumbBuffer => {
        const file = bucket.file(req.file.originalname, {});
        const fileThumb = bucket.file(thumbName, {});

        Promise.all([file.save(imageBuffer), fileThumb.save(thumbBuffer)])
          .then(async () => {
            // let uuid = uuidv1();
            // let uuidThumb = uuidv1();
            await file.makePublic();
            await fileThumb.makePublic();
            // await file.setMetadata({
            //   contentType: req.file.mimetype,
            //   metadata: {
            //     firebaseStorageDownloadTokens: uuid
            //   }
            // });
            // await fileThumb.setMetadata({
            //   contentType: req.file.mimetype,
            //   metadata: {
            //     firebaseStorageDownloadTokens: uuidThumb
            //   }
            // });
            // await file.getSignedUrl({
            //   action: "read",
            //   expires: new Date("2021-01-01")
            // });
            // await fileThumb.getSignedUrl({
            //   action: "read",
            //   expires: new Date("2021-01-01")
            // });

            res.send(req.file.originalname);
          })
          .catch(err => {
            res.status(500).send({ error: err });
          });
      });
    } else {
      res.status(500).send({ error: "Uploading file problem" });
    }
  });

  app.get("/api/upload/image/:image", requireLogin, (req, res) => {
    const { image } = req.params;
    // const imageUrl = path.resolve(__dirname, "..", "uploads", "images", image);

    const file = bucket.file(image);

    file.get((err, file, apiResponse) => {
      if (err) {
        return res.status("404").send(err);
      }
      const imageUrlParts = image.split(".");
      const imageExtension = imageUrlParts[imageUrlParts - 1];

      res.set({ "Content-Type": `image/${imageExtension}` });

      https.get(apiResponse.mediaLink, body => {
        body.on("data", d => {
          res.write(d);
        });

        body.on("end", function() {
          res.end();
        });
      });
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
    try {
      const { query = "", sortBy, sortDirection } = req.query;

      const queryRegEx = new RegExp(query, "i");
      const searchedList = await Banknote.find({ $and: [{ _user: req.user.id }, { $or: [{ title: queryRegEx }, { country: queryRegEx }] }] }).sort({ [sortBy]: sortDirection === "ASC" ? 1 : -1 });

      res.send(searchedList);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
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
