const db = require("../../../config/DBconnection");

const list = async () => {
  const { rows: categories } = await db.query(`SELECT * FROM categorias`);
  return categories;
};

module.exports = { list };
