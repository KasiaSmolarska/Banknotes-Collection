const express = require("express");
require("./services/passport");
const app = express();

app.get("/", (req, res) => {
  res.send({
    banknotes: "test"
  });
});

const authRoutes = require("./routes/authRoutes");
authRoutes(app);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log("listening on port 7000"));
