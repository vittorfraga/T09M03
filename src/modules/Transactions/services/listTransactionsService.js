const db = require("../../../config/DBconnection");

const getAll = async (id, filtros = []) => {
  let query = {
    text: `SELECT transacoes.*, categorias.descricao as categoria_nome
    FROM transacoes
    JOIN categorias ON transacoes.categoria_id = categorias.id
    WHERE usuario_id = $1  ORDER BY id
    `,
    values: [id],
  };

  if (filtros && filtros.length > 0) {
    let filtroCategory = filtros.map((_, index) => `$${index + 2}`).join(",");
    let values = [id, ...filtros];

    if (filtros.length === 1) {
      query.text = `
        SELECT transacoes.*, categorias.descricao as categoria_nome
        FROM transacoes
        JOIN categorias ON transacoes.categoria_id = categorias.id
        WHERE usuario_id = $1 AND categorias.descricao = $2  ORDER BY id
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

module.exports = { getAll, getOne };
