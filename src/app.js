const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("🚀 Jenkins CI/CD Node.js App Running");
});

module.exports = app;

