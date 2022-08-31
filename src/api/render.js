const router = require("express").Router();

const { generateImage } = require("./generateImage");

router.get("/render/:id", generateImage);
module.exports = router;
