const axios = require("axios");
const fs = require("fs");
const canvas = require("canvas");
const path = require("path");
// const ftp = require("ftp");
const ethers = require("ethers");
const abi = require("./abi.json");

const { NFTStorage, Blob } = require("nft.storage");

var admin = require("firebase-admin");
var { service } = require("./service.js");

admin.initializeApp({
  credential: admin.credential.cert(service),
  databaseURL: "https://world-of-outfits-default-rtdb.firebaseio.com",
  databaseAuthVariableOverride: {
    uid: process.env.uid,
  },
});

module.exports = {
  generateImage: async (req, res, next) => {
    try {
      const { id } = req.params;

      const provider = new ethers.providers.JsonRpcProvider(
        "https://rinkeby.infura.io/v3/275e79e94ded4372a3c6510f53718bc7"
      );
      const ct = new ethers.Contract(
        "0x2846573b8b87a034Fc1b42466367400b9F51A83a",
        abi,
        provider
      );
      const ver = (await ct.tokenVersion(id)).toNumber();

      var db = admin.database();
      var ref = db.ref("/" + id);
      let metadata;
      await ref.once("value", function (snapshot) {
        metadata = snapshot.val();
      });
      if (metadata.version >= ver) return res.send("Invalid Request");
      metadata.version++;

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

      delete metadata.attributes;
      metadata.attributes = [];
      metadata.attributes.push({
        trait_type: "Exclusive",
        value: id < 10000 ? "World of Women" : "World of Outfits",
      });

      let layer;
      //Select group
      const group = Math.floor(Math.random() * 100 + 1);
      if (group <= 30) {
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
      } else if (group <= 60) {
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
      } else if (group <= 90) {
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
      } else if (group <= 96) {
        let legendary = fs.readdirSync(path.join(__dirname, `../layers/full/`));
        let lindex = Math.floor(Math.random() * legendary.length);
        layer = await canvas.loadImage(
          path.join(__dirname, `../layers/full/${legendary[lindex]}`)
        );
        ctx.drawImage(layer, 0, 0, 2300, 2300);

        metadata.attributes.push({
          trait_type: "Legendary",
          value: path.parse(legendary[lindex]).name,
        });
      } else {
        let legendary = fs.readdirSync(
          path.join(__dirname, `../layers/legendary/`)
        );
        let lindex = Math.floor(Math.random() * legendary.length);
        layer = await canvas.loadImage(
          path.join(__dirname, `../layers/full/${legendary[lindex]}`)
        );
        ctx.drawImage(layer, 0, 0, 2300, 2300);

        metadata.attributes.push({
          trait_type: "Outfit",
          value: path.parse(legendary[lindex]).name,
        });
      }

      const buffer = ca.toBuffer("image/png");

      const client = new NFTStorage({ token: process.env.NFT_STORAGE_TOKEN });
      const imageFile = new Blob([buffer]);

      const ret = await client.storeBlob(imageFile);
      metadata.image = "https://" + ret + ".ipfs.nftstorage.link/";
      await ref.set(metadata);
      return res.send(metadata.image);
    } catch (error) {
      console.log("server error", error.message);
      next(error);
    }
  },
};
