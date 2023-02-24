const transactionService = require("./listTransactionsService");

const getStatement = async (userId) => {
  let entradas = 0;
  let saidas = 0;

  const transactions = await transactionService.getAll(userId);

  transactions.forEach((transaction) => {
    if (transaction.tipo === "entrada") {
      entradas += transaction.valor;
    } else if (transaction.tipo === "saida" || transaction.tipo === "saída") {
      saidas += transaction.valor;
    }
  });

  return {
    entradas,
    saidas,
  };
};

module.exports = { getStatement };
