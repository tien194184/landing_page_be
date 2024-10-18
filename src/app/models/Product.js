const mongoose = require("mongoose");
const slugify = require('slugify');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  description: { type: String },
  slug: { type: String, unique: true },
  discount: { type: Number },
  soldAmount: { type: Number },
  reviewCount: { type: Number },
  storeRevenue: { type: Number },
  productCount: { type: Number },
  reviewCountStore: { type: Number },
  photoReviewCount: { type: Number },
  fiveStarCount: { type: Number },
  fourStarCount: { type: Number },
  threeStarCount: { type: Number },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: Number, default: 1 },
  image1: { type: String },
  image2: { type: String },
  image3: { type: String },
  image4: { type: String },
  image5: { type: String },
  image6: { type: String },
  image7: { type: String },
  image8: { type: String },
  image9: { type: String },
  image10: { type: String },
});

ProductSchema.pre("save", async function (next) {
  if (this.isModified("productName")) {
    // Generate initial slug from product name
    let slug = slugify(this.productName, { lower: true });

    // Check if a product with the same slug exists
    let productWithSameSlug = await mongoose.models.Product.findOne({ slug });

    // If a product with the same slug exists, modify slug
    let counter = 1;
    while (productWithSameSlug) {
      slug = `${slugify(this.productName, { lower: true })}-${counter}`;
      productWithSameSlug = await mongoose.models.Product.findOne({ slug });
      counter++;
    }

    this.slug = slug;
  }
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
