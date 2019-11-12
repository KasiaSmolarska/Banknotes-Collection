const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send({
    banknotes: "test"
  });
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log("listening on port 7000"));
