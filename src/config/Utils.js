const db = require("./DBconnection");

const emailAlreadyExists = async (value) => {
  const result = await db.query(
    `SELECT EXISTS (SELECT 1 FROM usuarios WHERE email =$1)`,
    [value]
  );
  return result.rows[0].exists;
};

const getCategoryNamedById = async (id) => {
  const {
    rows: [result],
  } = await db.query(`SELECT descricao FROM categorias WHERE id = $1`, [id]);

  if (!result) {
    return null;
  }

  return result.descricao;
};

module.exports = { emailAlreadyExists, getCategoryNamedById };
