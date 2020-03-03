const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const User = mongoose.model("users");
const Banknote = mongoose.model("banknotes");
const IssueBank = mongoose.model("issueBanks");

const admin = require("firebase-admin");

var firebaseStorage = admin.storage();

var bucket = firebaseStorage.bucket();

module.exports = app => {
  app.delete("/api/profile", requireLogin, async (req, res) => {
    try {
      const banknotes = await Banknote.find({ _user: req.user._id });

      // delete user photos

      const images = ["imageFront", "imageReverse"];

      banknotes.forEach(banknote => {
        images.forEach(image => {
          if (typeof banknote[image] === "undefined") {
            return;
          }

          const filesToDelete = [bucket.file(banknote[image]), bucket.file(`thumb-${banknote[image]}`)];

          filesToDelete.forEach(async file => {
            await file
              .delete()
              .then(() => {
                console.log(`Successfully deleted photo: ${file.name}, userID : ${req.user._id}`);
              })
              .catch(err => {
                console.log(`Failed to remove photo, error: ${err}`);
              });
          });
        });
      });

      // delete use issueBanks
      await IssueBank.deleteMany({ _user: req.user._id });

      // delete user Banknotes
      await Banknote.deleteMany({ _user: req.user._id });

      // delete user
      await User.findOneAndRemove({ _id: req.user._id });

      res.json({
        msg: "User data has been removed"
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
};
