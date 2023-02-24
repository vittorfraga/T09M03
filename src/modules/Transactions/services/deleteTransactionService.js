const db = require("../../../config/DBconnection");

const deleteOne = async (id) => {
  const query = {
    text: "DELETE FROM transacoes WHERE id = $1",
    values: [id],
  };
  await db.query(query);
};

module.exports = deleteOne;
