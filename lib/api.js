// const ShopItem = require("./models/ShopItem");
// const express = require("express");
// const router = express.Router();

// // SHOP RESTFUL API ENDPOINTS -->

// router.get("/shop", (req, res, next) => {
//   ShopItem.find((err, items) => {
//     if (err) return console.log(err);
//     return res.send({ items });
//   });
// });

// router.post("/shop", (req, res, next) => {
//   const { name, price, description } = req.body;
//   const shopItem = new ShopItem({
//     name,
//     price,
//     description
//   });

//   shopItem.save((err, item) => {
//     if (err) return console.log(err);
//     return res.send({ success: true });
//   });
// });

// router.delete("/shop/:id", (req, res) => {
//   const { id } = req.params;

//   ShopItem.findOneAndDelete({ _id: id }, (err, item) => {
//     if (err) return console.log(err);
//     return res.send({ success: true });
//   });
// });

// module.exports = router;
