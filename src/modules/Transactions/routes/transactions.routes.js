const { Router } = require("express");
const queryValidator = require("../../../shared/middlewares/filterValidation");

const {
  createTransaction,
} = require("../controllers/createTransactionController");
const deleteTransaction = require("../controllers/deleteTransactionController");
const {
  listTransactions,
  listTransactionById,
} = require("../controllers/listTransactionsController");
const {
  updateTransaction,
} = require("../controllers/updateTransactionController");

const transactionsRouter = Router();

transactionsRouter.post("/transacao", createTransaction);
transactionsRouter.get("/transacao", queryValidator, listTransactions);
transactionsRouter.get("/transacao/:id", listTransactionById);
transactionsRouter.put("/transacao/:id", updateTransaction);
transactionsRouter.delete("/transacao/:id", deleteTransaction);

module.exports = transactionsRouter;
