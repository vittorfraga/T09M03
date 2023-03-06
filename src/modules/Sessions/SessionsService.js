const { compare } = require("bcrypt");
const db = require("../../config/DBconnection");

const createSession = async (email, password) => {
  try {
    const user = await db.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);

    if (user.rowCount === 0) {
      return "Usuário não encontrado!";
    }

    const passwordMatch = await compare(password, user.rows[0].senha);

    if (!passwordMatch) {
      return "Usuário ou senha incorreto!";
    }

    return user.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { createSession };
