const yup = require("yup");
const { create } = require("../services/createTransactionService");
const transactionsFieldsValidation = require("../validations/bodyTransactionValidation");

const createTransaction = async (req, res) => {
  const userId = req.userId;
  const transaction = req.body;

  try {
    await transactionsFieldsValidation.validate(transaction, {
      abortEarly: false,
    });

    const transactionCreated = await create(transaction, userId);

    res.status(201).json(transactionCreated);
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({
        message: err.errors,
      });
    } else {
      return res.status(500).json({ message: `${err}` });
    }
  }
};

module.exports = { createTransaction };
