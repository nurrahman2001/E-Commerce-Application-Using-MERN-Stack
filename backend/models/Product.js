const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true, default:"https://i.imgur.com/BG8J0Fj.jpg" },
    creationAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true, set: (value) => value.charAt(0).toUpperCase() + value.slice(1) },
    discountPercentage: { type: Number, required: true, default: 0 },
    totalSales: { type: Number, default: 0 },
    description: { type: String, required: true },
    category: { type: categorySchema, required: true },
    images: { type: [String], required: true },
    creationAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: false, versionKey: false }
);

module.exports = mongoose.model("Product", productSchema);
