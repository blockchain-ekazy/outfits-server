const router = require("express").Router();

const { generateImage } = require("./generateImage");

// router.get(
//   "/render/:Background:hair:body:uniform:instrument:eye:eyebrow:mouth:accessory:bang:headdress",
//   generateImage
// );

router.get("/render/:id", generateImage);
module.exports = router;
