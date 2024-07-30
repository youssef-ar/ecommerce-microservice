const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category:{type: String, required: true},
  Inventory:{type: Number, required: true},
}, { collection : 'products',
     strict: false
 });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;