const yup = require("yup");
const { getCategorieNamedById } = require("../../Users/services/utils");
const { create } = require("../services/createTransactionService");
const transactionsFieldsValidation = require("../validations/bodyTransactionValidation");

const createTransaction = async (req, res) => {
  const usuario_id = req.userId;
  const transaction = req.body;

  try {
    await transactionsFieldsValidation.validate(transaction);

    const categoria_nome = await getCategorieNamedById(
      transaction.categoria_id
    );

    if (!categoria_nome) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    const transactionCreated = await create({
      ...transaction,
      usuario_id,
    });

    res.status(201).json({
      ...transactionCreated,
      categoria_nome,
    });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({
        message: err.errors[0],
      });
    } else {
      return res.status(500).json({ message: `${err}` });
    }
  }
};

module.exports = { createTransaction };
