const db = require("../../../config/DBconnection");

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

module.exports = { create };
