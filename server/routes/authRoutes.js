const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google", { session: true, failureRedirect: "/error" }), (req, res) => {
    res.redirect("/");
  });

  app.get("/auth/facebook", passport.authenticate("facebook"));

  app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/error" }), function(req, res) {
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send({ req: req.user });
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    // logout() is a passport method which clean a user cookie
    res.send(req.user);
  });
};
