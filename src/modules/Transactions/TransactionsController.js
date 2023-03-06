const yup = require("yup");

const { getCategoryNamedById } = require("../../config/Utils");
const transactionsService = require("./TransactionsService");
const transactionsFieldsValidation = require("./TransactionsValidation");

const createTransaction = async (req, res) => {
  const usuario_id = req.userId;
  const transaction = req.body;

  try {
    await transactionsFieldsValidation.validate(transaction);

    const categoria_nome = await getCategoryNamedById(transaction.categoria_id);

    if (!categoria_nome) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    const transactionCreated = await transactionsService.create(
      transaction,
      usuario_id
    );

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

const listTransactions = async (req, res) => {
  const userId = req.userId;
  const filtros = req.query.filtro;

  try {
    let userTrasactions;

    if (Array.isArray(filtros) && filtros.length > 0) {
      userTrasactions = await transactionsService.getAll(userId, filtros);
    } else {
      userTrasactions = await transactionsService.getAll(userId);
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
    const [transaction] = await transactionsService.getOne(transactionId);

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

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  const userId = req.userId;

  try {
    const userTransaction = await transactionsService.getOne(id);

    await transactionsFieldsValidation.validate(req.body);

    if (userTransaction[0].usuario_id !== userId) {
      return res.status(401).json({ message: "Usuário não autorizado" });
    }

    const categoria_nome = await getCategoryNamedById(categoria_id);

    const updatedTransaction = await transactionsService.update(id, {
      descricao,
      valor,
      data,
      categoria_id,
      tipo,
    });

    res.status(200).json({ ...updatedTransaction, categoria_nome });
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

const deleteTransaction = async (req, res) => {
  const userId = req.userId;
  const transactionId = req.params.id;

  try {
    const [transaction] = await transactionsService.getOne(transactionId);

    if (!transaction) {
      return res.status(404).json({ message: "Transação não encontrada" });
    }

    if (userId !== transaction.usuario_id) {
      return res.status(401).json({ message: "Não autorizado!" });
    }

    await transactionsService.deleteOne(transactionId);

    return res.status(200).json({ message: "Transação excluída com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: `error: ${error}` });
  }
};

const getUserStatement = async (req, res) => {
  const userId = req.userId;

  try {
    const statement = await transactionsService.getStatement(userId);

    return res.status(200).json(statement);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = {
  createTransaction,
  listTransactions,
  listTransactionById,
  updateTransaction,
  deleteTransaction,
  getUserStatement,
};
