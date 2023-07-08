const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  img1: { type: String, required: true },
  img2: { type: String, required: true },
  img3: { type: String, required: true },
  img4: { type: String, required: true },
  price: { type: Number, required: true },
  fuel: { type: String, required: true },
  engine_capacity: { type: String, required: true },
  seats: { type: String, required: true },
  Transmission: { type: String, required: true },
  air_bags: { type: Number, required: true },
  type: { type: String, required: true },
  rating: { type: Number, required: true },
});

const ProductModel = mongoose.model("vehicle", productSchema);

module.exports = { ProductModel };
