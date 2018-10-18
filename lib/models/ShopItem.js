const mongoose = require("mongoose");

const ShopItemSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  price: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: "Description for this product has not been set yet"
  }
});

module.exports = mongoose.model("ShopItem", ShopItemSchema);
