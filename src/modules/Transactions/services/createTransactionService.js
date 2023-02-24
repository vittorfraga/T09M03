const db = require("../../../config/DBconnection");
const { getFieldById } = require("../../Users/services/utils");

const create = async (transacao, usuario_id) => {
  const { descricao, valor, data, categoria_id, tipo } = transacao;

  const categoryName = await getFieldById(
    "categorias",
    "descricao",
    categoria_id
  );

  const query = {
    text: "INSERT INTO transacoes (descricao, valor, data, usuario_id, categoria_id, tipo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    values: [descricao, valor, data, usuario_id, categoria_id, tipo],
  };

  const {
    rows: [transaction],
  } = await db.query(query);

  return {
    id: transaction.id,
    tipo: transaction.tipo,
    descricao: transaction.descricao,
    valor: transaction.valor,
    data: transaction.data,
    usuario_id: transaction.usuario_id,
    categoria_id: transaction.categoria_id,
    categoria_nome: categoryName,
  };
};

module.exports = { create, getFieldById };
