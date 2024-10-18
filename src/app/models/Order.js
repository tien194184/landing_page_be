const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true },
  name: { type: String },
  phone: { type: String },
  address: { type: String },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  sellerId: { type: Schema.Types.ObjectId, ref: "User" },
  color: { type: String },
  voucher: { type: String },
  totalMonney: { type: Number },
});

module.exports = mongoose.model("Order", orderSchema);
