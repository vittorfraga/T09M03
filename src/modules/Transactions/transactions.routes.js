const { Router } = require("express");
const queryValidator = require("../../shared/middlewares/filterValidation");
const transactionsController = require("./TransactionsController");

const transactionsRouter = Router();

transactionsRouter.post("/transacao", transactionsController.createTransaction);
transactionsRouter.get(
  "/transacao",
  queryValidator,
  transactionsController.listTransactions
);
transactionsRouter.get(
  "/transacao/:id",
  transactionsController.listTransactionById
);
transactionsRouter.put(
  "/transacao/:id",
  transactionsController.updateTransaction
);
transactionsRouter.delete(
  "/transacao/:id",
  transactionsController.deleteTransaction
);
transactionsRouter.get("/extrato", transactionsController.getUserStatement);

module.exports = transactionsRouter;
