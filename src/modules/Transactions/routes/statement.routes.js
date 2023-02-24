const { Router } = require("express");

const {
  getUserStatement,
} = require("../controllers/ bankStatementController.js.js");

const statementRouter = Router();

statementRouter.get("/extrato", getUserStatement);

module.exports = statementRouter;
