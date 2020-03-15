module.exports = (req, res, next) => {
  console.log("req.user",req.user);

  if (!req.user) {
    console.log("req.user",req.user);
    return res.status(401).redirect("/login");
  }
  next();
};
