//process.env.NODE_ENV - zmienna środowiskowa dostępna na heroku

if (process.env.NODE_ENV === "production") {
  // production
  module.exports = require("./prod");
} else {
  // development enviroment
  module.exports = require("./dev");
}
