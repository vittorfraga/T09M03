const express = require("express");
const categoriesRouter = require("../../modules/Categories/routes/categories.routes");
const statementRouter = require("../../modules/Transactions/routes/statement.routes");
const transactionsRouter = require("../../modules/Transactions/routes/transactions.routes");
const profileRouter = require("../../modules/Users/routes/profile.routes");
const sessionRouter = require("../../modules/Users/routes/session.routes");
const usersRouter = require("../../modules/Users/routes/user.routes");
const isAuthenticated = require("../middlewares/isAuthenticated");

const routes = express.Router();

routes.use(usersRouter);
routes.use(sessionRouter);
routes.use(isAuthenticated);
routes.use(profileRouter);
routes.use(categoriesRouter);
routes.use(transactionsRouter);
routes.use(statementRouter);

module.exports = routes;
