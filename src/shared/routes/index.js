const express = require("express");

const categoriesRouter = require("../../modules/Categories/categories.routes");
const transactionsRouter = require("../../modules/Transactions/transactions.routes");
const sessionRouter = require("../../modules/Sessions/sessions.routes");
const usersRouter = require("../../modules/Users/users.routes");
const isAuthenticated = require("../middlewares/isAuthenticated");

const routes = express.Router();

routes.use(usersRouter);
routes.use(sessionRouter);
routes.use(isAuthenticated);
routes.use(categoriesRouter);
routes.use(transactionsRouter);

module.exports = routes;
