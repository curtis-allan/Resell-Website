const mongoose = require("mongoose");

const ShopItemSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  price: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("ShopItem", ShopItemSchema);
