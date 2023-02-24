const { Router } = require("express");
const listCategories = require("../controllers/categoriesController.");

const categoriesRouter = Router();

categoriesRouter.get("/categoria", listCategories);

module.exports = categoriesRouter;
