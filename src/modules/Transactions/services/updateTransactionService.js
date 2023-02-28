const db = require("../../../config/DBconnection");

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

module.exports = {
  update,
};
