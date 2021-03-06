const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const md5 = require("md5");

const User = mongoose.model("users");

module.exports = app => {
  app.delete("/api/profile", requireLogin, async (req, res) => {
    try {
      // deactivate user
      const user = await User.findById(req.user._id);

      user.active = false;
      user.email = md5(user.email);
      user.googleId !== null ? user.googleId = user.googleId + "delete" : user.googleId = user.googleId;

      await user.save();
      res.json({
        msg: "User is deactivated"
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
};
