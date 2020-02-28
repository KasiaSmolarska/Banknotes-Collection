const mongoose = require("mongoose");
const https = require("https");
const requireLogin = require("../middlewares/requireLogin");
const imageThumbnail = require("image-thumbnail");

const uuidv1 = require("uuid/v1");

const multer = require("multer");

const path = require("path");

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
  fileFilter: function (req, file, cb) {
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

const createBanknote = async (body, userId) => {
  const banknoteData = {};
  for (const key in body) {
    if (body.hasOwnProperty(key)) {
      const banknoteFieldData = body[key];

      if (key === "issueBank") {
        const existingIssueBank = await IssueBank.findOne({ name: banknoteFieldData, _user: userId });

        if (existingIssueBank) {
          console.log(`You have already have bank ${existingIssueBank.name} in your collection`);
          banknoteData[key] = existingIssueBank.id;
          continue;
        }

        let issueBankData = {
          _user: userId,
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
  return banknoteData;
};

module.exports = app => {
  app.post("/api/upload/image", upload.single("file"), async (req, res) => {
    if (req.file) {
      const directoryPath = path.resolve(__dirname, "..", "uploads", "images");

      const imageBuffer = req.file.buffer;
      const options = { width: 100, height: 100, jpegOptions: { force: true, quality: 90 } };
      let uuid = uuidv1();

      const thumbName = `thumb-${uuid}${req.file.originalname}`;

      await imageThumbnail(imageBuffer, options).then(thumbBuffer => {
        const file = bucket.file(uuid + req.file.originalname, {});
        const fileThumb = bucket.file(thumbName, {});

        Promise.all([file.save(imageBuffer), fileThumb.save(thumbBuffer)])
          .then(async () => {
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

            res.send(uuid + req.file.originalname);
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

        body.on("end", function () {
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

    const createdBanknoteData = await createBanknote(req.body, req.user._id);

    banknoteData = {
      ...banknoteData,
      ...createdBanknoteData
    };

    await new Banknote(banknoteData).save((err, banknote) => {
      if (err) {
        console.log(err);
        return res.status(422).send(err);
      }
      res.send({ status: "banknote was added to you collection" });
    });
  });

  app.put("/api/banknote/like/:banknoteId", requireLogin, async (req, res) => {
    try {
      const { banknoteId } = req.params;
      let banknote = await Banknote.findById(banknoteId);
      console.log(req.user._id, banknote._user);

      if (banknote._user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          msg: "You are not permitted to like this banknote!"
        });
      }

      if (!banknote) {
        return res.status(404).json({
          msg: "Banknote you are trying to like doesn't exist"
        });
      }

      banknote.favorite = !banknote.favorite;

      await banknote.save(banknote.favorite);
      res.send(banknote.favorite);
    } catch (err) {
      console.log(err)
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  // GET BANKNOTE BY ID

  app.get("/api/banknote/:banknoteId", requireLogin, async (req, res) => {
    try {
      const banknoteId = req.params.banknoteId;
      const banknote = await Banknote.findById(banknoteId);

      if (!banknote) {
        return res.status(404).json({
          msg: "Banknote you are trying to fetch doesn't exist"
        });
      }

      if (banknote._user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          msg: "You are not permitted to fetch this banknote!"
        });
      }

      let banknoteToSend = {
        ...banknote._doc
      }

      if (banknote.issueBank) {
        const foundedBankName = await IssueBank.findById(banknote.issueBank);

        banknoteToSend.issueBank = foundedBankName.name;

      }


      res.send(banknoteToSend);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  // Update banknote

  app.post("/api/banknote/:banknoteId", requireLogin, async (req, res) => {
    try {
      const banknoteId = req.params.banknoteId;
      let banknote = await Banknote.findOne({ _user: req.user._id, _id: banknoteId });
      if (!banknote) {
        return res.status(404).json({
          msg: "Banknote you are trying to change doesn't exist"
        });
      }

      const createdBanknoteData = await createBanknote(req.body, req.user._id);
      const banknotes = await Banknote.find({ _user: req.user.id });

      const images = ["imageFront", "imageReverse"];
      images.forEach(image => {
        if (banknote[image] === createdBanknoteData[image]) {
          return;
        }
        if (typeof banknote[image] === "undefined") {
          return;
        }

        const isThereAnyBanknoteWithThisImage = banknotes.find(elem => banknote[image] === elem[image]);
        if (isThereAnyBanknoteWithThisImage) {
          console.log("Another banknote uses this photo. Photo was not removed")
          return;
        }

        const filesToDelete = [bucket.file(banknote[image]), bucket.file(`thumb-${banknote[image]}`)]

        filesToDelete.forEach(file => {
          file.delete().then(() => {
            console.log(`Successfully deleted photo: ${file.name}, userID : ${req.user._id}`)
          }).catch(err => {
            console.log(`Failed to remove photo, error: ${err}`)
          });
        })

      });

      banknote = await Banknote.findOneAndUpdate({ _user: req.user._id, _id: banknoteId }, { $set: createdBanknoteData }, { new: true });
      return res.send(banknote);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  // DELETE banknote by ID

  app.delete("/api/banknote/:banknoteId", requireLogin, async (req, res) => {
    try {
      const banknoteId = req.params.banknoteId;
      const banknote = await Banknote.findById(banknoteId);

      if (!banknote) {
        return res.status(404).json({
          msg: "Banknote you are trying to delete doesn't exist"
        });
      }

      if (banknote._user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          msg: "You are not permitted to fetch this banknote!"
        });
      }

      await banknote.remove();

      const banknotes = await Banknote.find({ _user: req.user.id });

      const images = ["imageFront", "imageReverse"];
      images.forEach(image => {
        if (typeof banknote[image] === "undefined") {
          return;
        }

        const isThereAnyBanknoteWithThisImage = banknotes.find(elem => banknote[image] === elem[image]);
        if (isThereAnyBanknoteWithThisImage) {
          console.log("Another banknote uses this photo. Photo was not removed")
          return;
        }
        const filesToDelete = [bucket.file(banknote[image]), bucket.file(`thumb-${banknote[image]}`)]

        filesToDelete.forEach(file => {
          file.delete().then(() => {
            console.log(`Successfully deleted photo: ${file.name}, userID : ${req.user._id}`)
          }).catch(err => {
            console.log(`Failed to remove photo, error: ${err}`)
          });
        })

      });


      res.json({ msg: "Banknote removed" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
};
