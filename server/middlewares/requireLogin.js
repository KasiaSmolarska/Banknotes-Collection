module.exports = (req, res, next) => {

  if (!req.user) {
    return res.status(401).redirect("/login");
  }

  if (!req.user.confirmed) {
    return res.status(401).redirect("/login");
  }
  next();
};
