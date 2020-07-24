const express = require("express");
const categoriesRouter = express.Router();
const { requireUser } = require("./utils");
const { createCategories, getAllCategories } = require("../db");

categoriesRouter.get("/", async (req, res) => {
  const categories = await getAllCategories();

  console.log(categories);

  res.send({
    categories,
  });
});

module.exports = categoriesRouter;
