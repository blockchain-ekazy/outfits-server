const axios = require("axios");
const canvas = require("canvas");
const path = require("path");

const IPFS = require("ipfs-core");
// const admin = require("firebase-admin");
// var serviceAccount = require("./service.json");

// const pinataSDK = require("@pinata/sdk");
// const pinata = pinataSDK(
//   "eb32f9dd67feb4945b01",
//   "b1866e1f829897d7388cd2a12b3be8e369cc2f44b5ba5b490fd531c845d81b77"
// );

module.exports = {
  generateImage: async (req, res, next) => {
    try {
      const { id, outfit } = req.params;

      const ca = canvas.createCanvas(550, 550);
      const ctx = ca.getContext("2d");

      // let base = await axios({
      //   method: "get",
      //   url: `https://worldofoutfits.com/collection/unnamed-${String(id)}.png`,
      //   responseType: "arraybuffer",
      // });
      // let img = new canvas.Image();
      // img.src = base.data;
      // ctx.drawImage(img, 0, 0, 2300, 2300);

      let layer = await canvas.loadImage(
        path.join(__dirname, `../layers/full/${outfit}.png`)
      );
      ctx.drawImage(layer, 0, 0, 550, 550);

      // let metadata;
      // await axios
      //   .get(
      //     "https://world-of-outfits-default-rtdb.firebaseio.com/" + id + ".json"
      //   )
      //   .then((res) => {
      //     metadata = res.data;
      //   });

      const buffer = ca.toBuffer("image/png");

      const ipfs = await IPFS.create();
      const cid = await ipfs.add(buffer);
      await ipfs.stop();
      console.log(cid);

      // await pinata
      //   .pinByHash(cid.path, {
      //     pinataMetadata: { name: "unnamed-" + id },
      //   })
      //   .then((result) => console.log(result));

      return res.json({ Id: cid });
    } catch (error) {
      console.log("server error", error.message);
      next(error);
    }
  },
};
