require("dotenv").config();

var express = require("express");
var app = express();
var path = require("path");

//render api
app.use("/api/", require("./src/api/render"));

app.listen(process.env.PORT || 8000, function () {
  console.log("App running on port 8000 ");
});
