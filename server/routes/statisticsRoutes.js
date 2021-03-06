const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Banknote = mongoose.model("banknotes");

module.exports = app => {
  app.get("/api/statistics/banknotes", requireLogin, async (req, res) => {
    try {
      const countries = Banknote.aggregate([{ $match: { _user: req.user._id, country: { $ne: null } } }, { $group: { _id: "$country", total: { $sum: 1 } } }]);

      const currencies = Banknote.aggregate([{ $match: { _user: req.user._id, currency: { $ne: null } } }, { $group: { _id: "$currency", total: { $sum: 1 } } }]);

      const continents = Banknote.aggregate([{ $match: { _user: req.user._id, continent: { $ne: null } } }, { $group: { _id: "$continent", total: { $sum: 1 } } }]);

      const favorites = Banknote.aggregate([{ $match: { _user: req.user._id, favorite: { $ne: null } } }, { $group: { _id: "$favorite", total: { $sum: 1 } } },  { $sort: { total: -1 } }]);

      const issueYears = Banknote.aggregate([{ $match: { _user: req.user._id, issueYear: { $ne: null } } }, { $group: { _id: "$issueYear", total: { $sum: 1 } } }, { $sort: { _id: -1 } }]);

      const values = Banknote.aggregate([{ $match: { _user: req.user._id, value: { $ne: null } } }, { $group: { _id: "$value" } }, { $sort: { _id: -1 } }]);

      const own = Banknote.aggregate([{ $match: { _user: req.user._id, own: { $ne: null } } }, { $group: { _id: "$own" , total: { $sum: 1 }} }]);

      const types = Banknote.aggregate([{ $match: { _user: req.user._id, type: { $ne: null } } }, { $group: { _id: "$type" , total: { $sum: 1 }} }]);

      const dateCreated = Banknote.aggregate([
        {
          $match: { _user: req.user._id, dateCreated: { $ne: null } }
        },
        {
          $project: {
            yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$dateCreated" } }
          }
        },
        { $group: { _id: "$yearMonthDay", total: { $sum: 1 } } },

      ]);

      Promise.all([countries, continents, favorites, dateCreated, currencies, values, issueYears, own, types]).then(([countries, continents, favorites, dateCreated, currencies, values, issueYears, own, types]) => {

        const statistcs = { countries, continents, favorites, dateCreated, currencies, values, issueYears, own, types };

        res.send(statistcs);
      });


    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
};
