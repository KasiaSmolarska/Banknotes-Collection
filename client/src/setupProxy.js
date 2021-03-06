const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/auth/google", { target: "http://localhost:7000" }));
  app.use(proxy("/auth/facebook", { target: "http://localhost:7000" }));
  app.use(proxy("/auth/login", { target: "http://localhost:7000" }));
  app.use(proxy("/auth/register", { target: "http://localhost:7000" }));
  app.use(proxy("/auth/recover", { target: "http://localhost:7000" }));
  // app.use(proxy("/auth/reset", { target: "http://localhost:7000" }));
  app.use(proxy("/api/**", { target: "http://localhost:7000" }));
  //app.use(proxy("/dashboard", { target: "http://localhost:7000" }));
};
