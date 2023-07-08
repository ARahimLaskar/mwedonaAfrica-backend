const mongoose = require("mongoose");

require("dotenv").config();

const { ProductModel } = require("./Model/productsModel.js");

const productsJson = require("./db.json");
const start = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URL);
    await ProductModel.create(productsJson);
    console.log("data stored in atlas Successfully");
  } catch (error) {
    console.log(error);
  }
};

start();
