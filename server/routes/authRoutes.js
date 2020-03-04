const passport = require("passport");
const md5 = require("md5");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google", { session: true, failureRedirect: "/login" }), (req, res) => {
    res.redirect("/dashboard");
  });

  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), function(req, res) {
    res.redirect("/dashboard");
  });

  app.get("/api/current_user", ({ user }, res) => {
    const { _id, googleId, picture, familyName, given_name } = user;
    const newUser = { _id, googleId, picture, familyName, given_name };
    res.send({ user: newUser });
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    // logout() is a passport method which clean a user cookie
    res.send({ user: req.user });
  });
};
