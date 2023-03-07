const bcrypt = require("bcrypt");
const db = require("../../config/DBconnection");

const emailAlreadyExists = async (value) => {
  const result = await db.query(
    `SELECT EXISTS (SELECT 1 FROM usuarios WHERE email =$1)`,
    [value]
  );
  return result.rows[0].exists;
};

async function create(name, email, password) {
  const emailExists = await emailAlreadyExists(email);

  if (emailExists) {
    return "O email já existe";
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)";
  const values = [name, email, hashedPassword];

  const user = await db.query(query, values);

  return user;
}

const show = async (id) => {
  const query = {
    text: "SELECT id, nome, email FROM usuarios WHERE id = $1",
    values: [id],
  };
  const { rows: loggedUser } = await db.query(query);

  return loggedUser;
};

const update = async (nome, email, senha, id) => {
  try {
    const {
      rows: [user],
    } = await db.query("SELECT * from usuarios WHERE id = $1", [id]);
    if (!user) {
      return "Usuário não encontrado!";
    }

    if (email !== user.email) {
      const emailExists = await emailAlreadyExists(email);
      if (emailExists) {
        return "O email já existe!";
      }
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const query = {
      text: "UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4",
      values: [nome, email, hashedPassword, id],
    };

    const { rows: updatedUser } = await db.query(query);

    return updatedUser;
  } catch (err) {
    return `Falha ao atualizar o usuário: ${err.message}`;
  }
};

module.exports = {
  create,
  show,
  update,
};
