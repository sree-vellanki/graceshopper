const express = require("express");
const productsRouter = express.Router();
const { requireUser } = require("./utils");
const { getAllProducts, createProduct } = require("../db");

// NEED TO UPDATE ACCORDING TO UPDATED PRODUCTS TABLE
productsRouter.post("/", requireUser, async (req, res, next) => {
  const { name, price, description, catName, quant } = req.body;
  const { id } = req.user;

  const productData = {};

  try {
    productData.authorId = id;
    productData.name = name;
    productData.price = price;
    productData.description = description;
    productData.catName = catName;
    productData.quant = quant;

    const product = await createProduct(productData);

    res.send({ product });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.get("/", async (req, res) => {
  const products = await getAllProducts();

  console.log(products)

  res.send({
    products
  });
});

module.exports = productsRouter;