const bcrypt = require("bcrypt");
const db = require("../../../config/DBconnection");
const { fieldExists } = require("./utils");

async function insertUser(name, email, password) {
  const emailExists = await fieldExists("email", email);

  if (emailExists) {
    return "O email já existe";
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)";
  const values = [name, email, hashedPassword];

  const user = await db.query(query, values);

  return user;
}

module.exports = {
  insertUser,
};
