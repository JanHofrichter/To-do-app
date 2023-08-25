const express = require("express");
const app = express();
const apiRoutes = require("./tasks/taskRoutes");

app.use("/api", apiRoutes);

module.exports = app;
