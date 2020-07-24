const express = require("express");
const productsRouter = express.Router();
const { requireUser } = require("./utils");
const { getAllProducts, createProduct, addProductToCart, getProductById } = require("../db");

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

productsRouter.post("/addToCart", async (req, res, next) => {
  console.log("test")
  const {id, price} = req.body;
  let userId = req.user;
  // ^^^^do something if user is not logged in. if not logged in, store cart in localStorage
  const cartedProductData = {};
  
  try {
    cartedProductData.userId = userId;
    cartedProductData.id = id;
    cartedProductData.price = price;

    console.log(cartedProductData)
    const cartedProduct = await addProductToCart(cartedProductData);

    res.send({cartedProduct})
  } catch ({name, message}) {
    next({ name, message });
  }
})

productsRouter.post("/addToCartLocal", async (req, res, next) => {

  try {
    console.log("testing")
    const {id} = req.body;

    const cartedProduct = await getProductById(id);

    res.send({cartedProduct})
  } catch (error) {
    console.error("Problem grabbing product for cart", error)
  }
})

productsRouter.get("/", async (req, res) => {
  const products = await getAllProducts();

  res.send({
    products
  });
});

module.exports = productsRouter;