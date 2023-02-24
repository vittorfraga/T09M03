const db = require("../../../config/DBconnection");
const { getFieldById } = require("./createTransactionService");

const update = async (id, transactionData) => {
  const { descricao, valor, data, categoria_id, tipo } = transactionData;

  const query = {
    text: "UPDATE transacoes SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 WHERE id = $6 RETURNING *",
    values: [descricao, valor, data, categoria_id, tipo, id],
  };
  const {
    rows: [updatedTransaction],
  } = await db.query(query);

  const categoryName = await getFieldById(
    "categorias",
    "descricao",
    categoria_id
  );

  return {
    id: updatedTransaction.id,
    tipo: updatedTransaction.tipo,
    descricao: updatedTransaction.descricao,
    valor: updatedTransaction.valor,
    data: updatedTransaction.data,
    usuario_id: updatedTransaction.usuario_id,
    categoria_id: updatedTransaction.categoria_id,
    categoria_nome: categoryName,
  };
};

module.exports = {
  update,
};
