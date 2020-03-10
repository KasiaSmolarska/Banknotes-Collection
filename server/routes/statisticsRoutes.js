const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Banknote = mongoose.model("banknotes");

module.exports = app => {
  app.get("/api/statistics/banknotes", requireLogin, async (req, res) => {
    try {
      const countries = await Banknote.aggregate([{ $match: { _user: req.user._id, country: { $ne: null } } }, { $group: { _id: "$country", total: { $sum: 1 } } }, { $sort: { total: -1 } }]);

      const currencies = await Banknote.aggregate([{ $match: { _user: req.user._id, currency: { $ne: null } } }, { $group: { _id: "$currency", total: { $sum: 1 } } }, { $sort: { total: -1 } }]);

      const continents = await Banknote.aggregate([{ $match: { _user: req.user._id, continent: { $ne: null } } }, { $group: { _id: "$continent", total: { $sum: 1 } } }, { $sort: { total: -1 } }]);

      const favorites = await Banknote.aggregate([{ $match: { _user: req.user._id, favorite: { $ne: null } } }, { $group: { _id: "$favorite", total: { $sum: 1 } } }, { $sort: { total: -1 } }]);

      const dateCreated = await Banknote.aggregate([
        {
          $match: { _user: req.user._id, dateCreated: { $ne: null } }
        },
        {
          $project: {
            yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$dateCreated" } }
          }
        },
        { $group: { _id: "$yearMonthDay", total: { $sum: 1 } } },
        { $sort: { total: -1 } }
      ]);

      const statistcs = { countries, continents, favorites, dateCreated, currencies };

      res.send(statistcs);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
};
