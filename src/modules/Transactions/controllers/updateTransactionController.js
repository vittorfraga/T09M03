const yup = require("yup");
const listTransactions = require("../services/listTransactionsService");
const updateTransactions = require("../services/updateTransactionService");
const transactionsFieldsValidation = require("../validations/bodyTransactionValidation");

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  const userId = req.userId;

  try {
    const userTransaction = await listTransactions.getOne(id);

    await transactionsFieldsValidation.validate(req.body, {
      abortEarly: false,
    });

    if (userTransaction[0].usuario_id !== userId) {
      return res.status(401).json({ error: "Usuário não autorizado" });
    }

    const updatedTransaction = await updateTransactions.update(id, {
      descricao,
      valor,
      data,
      categoria_id,
      tipo,
    });

    res.status(200).json(updatedTransaction);
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: err.errors,
      });
    } else {
      return res.status(500).json({ message: `${err}` });
    }
  }
};
module.exports = {
  updateTransaction,
};
