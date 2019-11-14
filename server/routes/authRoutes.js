const passport = require("passport");

const requireLogin = require("../middlewares/requireLogin");

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
    res.send({ user });
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    // logout() is a passport method which clean a user cookie
    res.send({ user: req.user });
  });

  app.get("/dashboard", requireLogin, (req, res) => {
    res.send("<h2>dashboard</h2>");
  });
};
