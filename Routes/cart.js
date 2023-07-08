const { Router } = require("express");
const { CartModel } = require("../Model/cartModel.js");

const cartController = Router();

cartController.get("/", async (req, res) => {
  const cartData = await CartModel.find({ userId: req.body.userId });
  res.send(cartData);
});

cartController.post("/", async (req, res) => {
  const {
    name,
    image,
    img1,
    img2,
    img3,
    img4,
    price,
    fuel,
    engine_capacity,
    seats,
    Transmission,
    air_bags,
    type,
    rating,
    userId,
  } = req.body;
  const cartProducts = new CartModel({
    name,
    image,
    img1,
    img2,
    img3,
    img4,
    price,
    fuel,
    engine_capacity,
    seats,
    Transmission,
    air_bags,
    type,
    rating,
    userId,
  });
  await cartProducts.save();
  res.send("cart updated");
});

cartController.delete("/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const updateData = await CartModel.findOneAndDelete({
    _id: itemId,
    userId: req.body.userId,
  });
  if (updateData) {
    res.send("deleted");
  } else {
    res.send("cant delete");
  }
});
module.exports = cartController;
