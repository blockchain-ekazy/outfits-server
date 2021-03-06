require("dotenv").config();

var express = require("express");
var app = express();
// var multer = require("multer");
var cors = require("cors");
var path = require("path");

app.use(cors());

app.use((req, res, next) => {
  if (
    req.get("referrer").includes("outfits-new.vercel.app") ||
    req.get("referrer").includes("worldofoutfits.com") ||
    req.get("referrer").includes("localhost")
  )
    next();
  else res.status(403).end("Forbidden");
});

//metadata api
// app.use("/api/", require("./src/api/metadata"));

//render api
app.use("/api/", require("./src/api/render"));

app.listen(process.env.PORT || 8000, function () {
  console.log("App running on port 8000 ");
});
