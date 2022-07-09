require("dotenv").config();

var express = require("express");
var app = express();
// var multer = require("multer");
var cors = require("cors");
var path = require("path");

app.use(cors());

//metadata api
// app.use("/api/", require("./src/api/metadata"));

//render api
app.use("/api/", require("./src/api/render"));

app.listen(process.env.PORT || 8000, function () {
  console.log("App running on port 8000 ");
});
