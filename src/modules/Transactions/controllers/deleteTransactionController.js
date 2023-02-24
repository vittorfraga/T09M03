const deleteOne = require("../services/deleteTransactionService");
const listTransactions = require("../services/listTransactionsService");

const deleteTransaction = async (req, res) => {
  const userId = req.userId;
  const transactionId = req.params.id;

  try {
    const [transaction] = await listTransactions.getOne(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: "Transação não encontrada" });
    }

    if (userId !== transaction.usuario_id) {
      return res.status(401).json({ message: "Não autorizado!" });
    }

    await deleteOne(transactionId);

    return res.status(200).json({ message: "Transação excluída com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: `error: ${error}` });
  }
};

module.exports = deleteTransaction;
