const { getAll, getOne } = require("../services/listTransactionsService");

const listTransactions = async (req, res) => {
  const userId = req.userId;

  const filtros = req.query.filtro;

  try {
    let userTrasactions;

    if (Array.isArray(filtros) && filtros.length > 0) {
      userTrasactions = await getAll(userId, filtros);
    } else {
      userTrasactions = await getAll(userId);
    }

    if (!userTrasactions) {
      return res.status(404).json({ message: "Transações não encontradas" });
    }

    return res.status(200).json(userTrasactions);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const listTransactionById = async (req, res) => {
  const userId = req.userId;
  const transactionId = req.params.id;

  try {
    const [transaction] = await getOne(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: "Transação não encontrada" });
    }

    if (userId !== transaction.usuario_id) {
      return res.status(401).json({ message: "Não autorizado!" });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { listTransactions, listTransactionById };
