const axios = require("axios");
const fs = require("fs");
const canvas = require("canvas");
const path = require("path");
const ftp = require("ftp");

var admin = require("firebase-admin");
var { service } = require("./service.js");

admin.initializeApp({
  credential: admin.credential.cert(service),
  databaseURL: "https://world-of-outfits-default-rtdb.firebaseio.com",
});

module.exports = {
  generateImage: async (req, res, next) => {
    try {
      const { id } = req.params;

      //Canvas init
      const ca = canvas.createCanvas(2300, 2300);
      const ctx = ca.getContext("2d");

      //Draw body
      let base = await axios({
        method: "get",
        url: `https://worldofoutfits.com/bodies/unnamed-${id}.png`,
        responseType: "arraybuffer",
      });
      let img = new canvas.Image();
      img.src = base.data;
      ctx.drawImage(img, 0, 0, 2300, 2300);

      let metadata = {};
      var db = admin.database();
      var ref = db.ref("/" + id);
      await ref.once("value", function (snapshot) {
        metadata = snapshot.val();
      });
      delete metadata.attributes;
      metadata.attributes = [];
      metadata.attributes.push({
        trait_type: "World of Women Exclusive",
        value: "#" + id,
      });

      let layer;
      //Select group
      const group = Math.floor(Math.random() * 100 + 1);
      if (group <= 32) {
        //jewelry
        let jewelry = fs.readdirSync(
          path.join(__dirname, `../layers/jewelry/`)
        );
        let jindex = Math.floor(Math.random() * jewelry.length);
        layer = await canvas.loadImage(
          path.join(__dirname, `../layers/jewelry/${jewelry[jindex]}`)
        );
        ctx.drawImage(layer, 0, 0, 2300, 2300);

        //socks
        let socks = fs.readdirSync(path.join(__dirname, `../layers/socks/`));
        let soindex = Math.floor(Math.random() * socks.length);
        layer = await canvas.loadImage(
          path.join(__dirname, `../layers/socks/${socks[soindex]}`)
        );
        ctx.drawImage(layer, 0, 0, 2300, 2300);

        //shoes
        let shoes = fs.readdirSync(path.join(__dirname, `../layers/shoes/`));
        let sindex = Math.floor(Math.random() * shoes.length);
        layer = await canvas.loadImage(
          path.join(__dirname, `../layers/shoes/${shoes[sindex]}`)
        );
        ctx.drawImage(layer, 0, 0, 2300, 2300);

        //pants
        let pants = fs.readdirSync(
          path.join(__dirname, `../layers/pants skirts/`)
        );
        let pindex = Math.floor(Math.random() * pants.length);
        layer = await canvas.loadImage(
          path.join(__dirname, `../layers/pants skirts/${pants[pindex]}`)
        );
        ctx.drawImage(layer, 0, 0, 2300, 2300);

        //tops
        let tops = fs.readdirSync(path.join(__dirname, `../layers/tops/`));
        let tindex = Math.floor(Math.random() * tops.length);
        layer = await canvas.loadImage(
          path.join(__dirname, `../layers/tops/${tops[tindex]}`)
        );
        ctx.drawImage(layer, 0, 0, 2300, 2300);

        metadata.attributes.push({
          trait_type: "Jewelry",
          value: path.parse(jewelry[jindex]).name,
        });
        metadata.attributes.push({
          trait_type: "Socks",
          value: path.parse(socks[soindex]).name,
        });
        metadata.attributes.push({
          trait_type: "Shoes",
          value: path.parse(shoes[sindex]).name,
        });
        metadata.attributes.push({
          trait_type: "Pants/Skirt",
          value: path.parse(pants[pindex]).name,
        });
        metadata.attributes.push({
          trait_type: "Top",
          value: path.parse(tops[tindex]).name,
        });
      } else if (group <= 64) {
        //jewelry
        let jewelry = fs.readdirSync(
          path.join(__dirname, `../layers/jewelry/`)
        );
        let jindex = Math.floor(Math.random() * jewelry.length);
        layer = await canvas.loadImage(
          path.join(__dirname, `../layers/jewelry/${jewelry[jindex]}`)
        );
        ctx.drawImage(layer, 0, 0, 2300, 2300);

        //shoes
        let shoes = fs.readdirSync(path.join(__dirname, `../layers/shoes/`));
        let sindex = Math.floor(Math.random() * shoes.length);
        layer = await canvas.loadImage(
          path.join(__dirname, `../layers/shoes/${shoes[sindex]}`)
        );
        ctx.drawImage(layer, 0, 0, 2300, 2300);

        //dress
        let dress = fs.readdirSync(path.join(__dirname, `../layers/dress/`));
        let soindex = Math.floor(Math.random() * dress.length);
        layer = await canvas.loadImage(
          path.join(__dirname, `../layers/dress/${dress[soindex]}`)
        );
        ctx.drawImage(layer, 0, 0, 2300, 2300);

        metadata.attributes.push({
          trait_type: "Jewelry",
          value: path.parse(jewelry[jindex]).name,
        });
        metadata.attributes.push({
          trait_type: "Shoes",
          value: path.parse(shoes[sindex]).name,
        });
        metadata.attributes.push({
          trait_type: "Dress",
          value: path.parse(dress[soindex]).name,
        });
      } else if (group <= 96) {
        //jewelry
        let jewelry = fs.readdirSync(
          path.join(__dirname, `../layers/jewelry/`)
        );
        let jindex = Math.floor(Math.random() * jewelry.length);
        layer = await canvas.loadImage(
          path.join(__dirname, `../layers/jewelry/${jewelry[jindex]}`)
        );
        ctx.drawImage(layer, 0, 0, 2300, 2300);

        //socks
        let socks = fs.readdirSync(path.join(__dirname, `../layers/socks/`));
        let soindex = Math.floor(Math.random() * socks.length);
        layer = await canvas.loadImage(
          path.join(__dirname, `../layers/socks/${socks[soindex]}`)
        );
        ctx.drawImage(layer, 0, 0, 2300, 2300);

        //shoes
        let shoes = fs.readdirSync(path.join(__dirname, `../layers/shoes/`));
        let sindex = Math.floor(Math.random() * shoes.length);
        layer = await canvas.loadImage(
          path.join(__dirname, `../layers/shoes/${shoes[sindex]}`)
        );
        ctx.drawImage(layer, 0, 0, 2300, 2300);

        //pants
        let pants = fs.readdirSync(
          path.join(__dirname, `../layers/pants skirts/`)
        );
        let pindex = Math.floor(Math.random() * pants.length);
        layer = await canvas.loadImage(
          path.join(__dirname, `../layers/pants skirts/${pants[pindex]}`)
        );
        ctx.drawImage(layer, 0, 0, 2300, 2300);

        //tops
        let tops = fs.readdirSync(path.join(__dirname, `../layers/tops/`));
        let tindex = Math.floor(Math.random() * tops.length);
        layer = await canvas.loadImage(
          path.join(__dirname, `../layers/tops/${tops[tindex]}`)
        );
        ctx.drawImage(layer, 0, 0, 2300, 2300);

        //jackets
        let jackets = fs.readdirSync(
          path.join(__dirname, `../layers/jackets/`)
        );
        let jacindex = Math.floor(Math.random() * jackets.length);
        layer = await canvas.loadImage(
          path.join(__dirname, `../layers/jackets/${jackets[jacindex]}`)
        );
        ctx.drawImage(layer, 0, 0, 2300, 2300);

        metadata.attributes.push({
          trait_type: "Jewelry",
          value: path.parse(jewelry[jindex]).name,
        });
        metadata.attributes.push({
          trait_type: "Socks",
          value: path.parse(socks[soindex]).name,
        });
        metadata.attributes.push({
          trait_type: "Shoes",
          value: path.parse(shoes[sindex]).name,
        });
        metadata.attributes.push({
          trait_type: "Pants/Skirt",
          value: path.parse(pants[pindex]).name,
        });
        metadata.attributes.push({
          trait_type: "Top",
          value: path.parse(tops[tindex]).name,
        });
        metadata.attributes.push({
          trait_type: "Jacket",
          value: path.parse(jackets[jacindex]).name,
        });
      } else {
        let legendary = fs.readdirSync(path.join(__dirname, `../layers/full/`));
        let lindex = Math.floor(Math.random() * legendary.length);
        layer = await canvas.loadImage(
          path.join(__dirname, `../layers/full/${legendary[lindex]}`)
        );
        ctx.drawImage(layer, 0, 0, 2300, 2300);

        metadata.attributes.push({
          trait_type: "Legendary Outfit",
          value: path.parse(legendary[lindex]).name,
        });
      }

      const buffer = ca.toBuffer("image/png");

      const c = new ftp();
      c.connect({
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        host: process.env.FTP_HOST,
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
        }).then(async () => {
          await ref.set(metadata);
          return res.send("upload done!!");
        });
      });
    } catch (error) {
      console.log("server error", error.message);
      next(error);
    }
  },
};
