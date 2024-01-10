/** @format */

const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, trim: true, require: true },
    description: { type: String, trim: true, require: true },
    price: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema)