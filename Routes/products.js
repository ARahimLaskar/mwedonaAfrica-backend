const { Router } = require("express");
const { ProductModel } = require("../Model/productsModel.js");

const productController = Router();

productController.get("/", async (req, res) => {
  const { name, type, _sort, _order } = req.query;
  const queryObj = {};

  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }
  if (type) {
    queryObj.type = type;
  }

  let apiData = ProductModel.find(queryObj);

  const sortOptions = { price: 1 };
  if (_sort && _order) {
    sortOptions[_sort] = _order === "asc" ? 1 : -1;
    apiData = apiData.sort(sortOptions);
  }

  let page = Number(req.query._page) || 1;
  let limit = Number(req.query._limit) || 20;
  let skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);

  const data = await apiData;
  res.send(data);
});

module.exports = productController;
