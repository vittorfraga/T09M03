const db = require("../../config/DBconnection");

const buildGetAllQuery = (id, filtros = []) => {
  let query = {
    text: `SELECT transacoes.*, categorias.descricao as categoria_nome
      FROM transacoes
      JOIN categorias ON transacoes.categoria_id = categorias.id
      WHERE usuario_id = $1  ORDER BY id`,
    values: [id],
  };

  if (filtros && filtros.length > 0) {
    let filtro = filtros.map((filtro) => filtro.replace(/-/g, " "));
    let filtroCategory = filtro.map((_, index) => `$${index + 2}`).join(",");
    let values = [id, ...filtro];

    if (filtro.length === 1) {
      query.text = `
          SELECT transacoes.*, categorias.descricao as categoria_nome
          FROM transacoes
          JOIN categorias ON transacoes.categoria_id = categorias.id
          WHERE usuario_id = $1 AND categorias.descricao = $2 ORDER BY id
        `;
    } else {
      query.text = `
          SELECT transacoes.*, categorias.descricao as categoria_nome
          FROM transacoes
          JOIN categorias ON transacoes.categoria_id = categorias.id
          WHERE usuario_id = $1 AND categorias.descricao IN (${filtroCategory}) ORDER BY id
        `;
    }

    query.values = values;
  }

  return query;
};

const create = async (transactionData, usuario_id) => {
  const { tipo, descricao, valor, data, categoria_id } = transactionData;
  const query = {
    text: "INSERT INTO transacoes (tipo, descricao, valor, data, categoria_id, usuario_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    values: [tipo, descricao, valor, data, categoria_id, usuario_id],
  };

  const {
    rows: [result],
  } = await db.query(query);

  return result;
};

const getAll = async (id, filtros = []) => {
  const query = buildGetAllQuery(id, filtros);

  const { rows: transactions } = await db.query(query);

  const results = transactions.map((transaction) => {
    return {
      id: transaction.id,
      tipo: transaction.tipo,
      descricao: transaction.descricao,
      valor: transaction.valor,
      data: transaction.data,
      usuario_id: transaction.usuario_id,
      categoria_id: transaction.categoria_id,
      categoria_nome: transaction.categoria_nome,
    };
  });

  return results;
};

const getOne = async (id) => {
  const query = {
    text: `
        SELECT transacoes.*, categorias.descricao as categoria_nome 
        FROM transacoes
        JOIN categorias ON transacoes.categoria_id = categorias.id 
        WHERE transacoes.id = $1 
        LIMIT 1
      `,
    values: [id],
  };
  const {
    rows: [transaction],
  } = await db.query(query);

  if (!transaction) {
    return "Transação não encontrada";
  }

  return [
    {
      id: transaction.id,
      tipo: transaction.tipo,
      descricao: transaction.descricao,
      valor: transaction.valor,
      data: transaction.data,
      usuario_id: transaction.usuario_id,
      categoria_id: transaction.categoria_id,
      categoria_nome: transaction.categoria_nome,
    },
  ];
};

const update = async (id, transactionData) => {
  const { descricao, valor, data, categoria_id, tipo } = transactionData;

  const query = {
    text: "UPDATE transacoes SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 WHERE id = $6 RETURNING *",
    values: [descricao, valor, data, categoria_id, tipo, id],
  };
  const {
    rows: [updatedTransaction],
  } = await db.query(query);

  return updatedTransaction;
};

const deleteOne = async (id) => {
  const query = {
    text: "DELETE FROM transacoes WHERE id = $1",
    values: [id],
  };
  await db.query(query);
};

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

module.exports = { create, getOne, getAll, update, deleteOne, getStatement };
