const { Router } = require("express");
const CategoriesController = require("./CategoriesController.");

const categoriesRouter = Router();

categoriesRouter.get("/categoria", CategoriesController.listCategories);

module.exports = categoriesRouter;
