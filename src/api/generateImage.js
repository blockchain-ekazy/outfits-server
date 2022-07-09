const axios = require("axios");
const canvas = require("canvas");
const path = require("path");
const ftp = require("ftp");

module.exports = {
  generateImage: async (req, res, next) => {
    try {
      const { id, outfit } = req.params;

      const ca = canvas.createCanvas(2300, 2300);
      const ctx = ca.getContext("2d");

      let base = await axios({
        method: "get",
        url: `https://worldofoutfits.com/bodies/unnamed-${id}.png`,
        responseType: "arraybuffer",
      });
      let img = new canvas.Image();
      img.src = base.data;
      ctx.drawImage(img, 0, 0, 2300, 2300);

      let layer = await canvas.loadImage(
        path.join(__dirname, `../layers/full/${outfit}.png`)
      );
      ctx.drawImage(layer, 0, 0, 2300, 2300);
      const buffer = ca.toBuffer("image/png");

      const c = new ftp();
      c.connect({
        user: "owjhczcg5zyg",
        password: "1234comM",
        host: "208.109.26.191",
        // keepalive: true,
        connTimeout: "300",
      });

      c.on("ready", async function () {
        await new Promise((resolve, reject) => {
          c.put(buffer, `/public_html/collection/unnamed-${id}.png`, (err) => {
            if (err) reject(err);
            console.log("upload done");
            resolve();
          });
        });
        return res.send("upload done!!");
      });
    } catch (error) {
      console.log("server error", error.message);
      next(error);
    }
  },
};
