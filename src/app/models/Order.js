const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  name: { type: String },
  phone: { type: Number },
  address: { type: String },
  city: { type: String },
  option: { type: String },
  status: { type: Number, default: 1 },
  sellerId: { type: Schema.Types.ObjectId, ref: "User" },
  typeProduct: { type: String },
  quantity: { type: Number },
  discount: { type: String },
  totalMonney: { type: Number },
  tiktokShopDiscount: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
