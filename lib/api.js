const ShopItem = require("./models/ShopItem");
const express = require("express");
const router = express.Router();

router.get("/shop", (req, res) => {
  res.send({ ShopItems: "Milk" });
});

router.get("/stars", (req, res) => {
  res.send({ stars: 25 });
});

module.exports = router;
