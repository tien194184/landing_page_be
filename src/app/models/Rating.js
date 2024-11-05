const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ratingSchema = new Schema({
  username: { type: String },
  avatar: { type: String },
  star: { type: Number, default: 5 },
  comment: { type: String, required: true },
  productType: { type: String },
  imageRating1: { type: String },
  imageRating2: { type: String },
  imageRating3: { type: String },
  imageRating4: { type: String },
  feedback: { type: String },
  status: { type: Number, default: 1 },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Rating", ratingSchema);
