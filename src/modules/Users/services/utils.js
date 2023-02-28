const db = require("../../../config/DBconnection");

const fieldExists = async (column, value) => {
  const result = await db.query(
    `SELECT EXISTS (SELECT 1 FROM usuarios WHERE ${column}=$1)`,
    [value]
  );
  return result.rows[0].exists;
};

const getCategorieNamedById = async (id) => {
  const {
    rows: [result],
  } = await db.query(`SELECT descricao FROM categorias WHERE id = $1`, [id]);

  if (!result) {
    return null;
  }

  return result.descricao;
};

module.exports = { fieldExists, getCategorieNamedById };
