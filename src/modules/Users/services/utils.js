const db = require("../../../config/DBconnection");

const fieldExists = async (column, value) => {
  const result = await db.query(
    `SELECT EXISTS (SELECT 1 FROM usuarios WHERE ${column}=$1)`,
    [value]
  );
  return result.rows[0].exists;
};

const getFieldById = async (table, field, id) => {
  const {
    rows: [result],
  } = await db.query(`SELECT ${field} FROM ${table} WHERE id = $1`, [id]);
  if (!result) {
    throw new Error(` Id de ${table} não encontrado`);
  }
  return result[field];
};

module.exports = { fieldExists, getFieldById };
