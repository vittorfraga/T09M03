const yup = require("yup");
const UsersServices = require("./UsersServices");
const fieldsValidation = require("./UsersValidations");

const createUser = async (req, res) => {
  const { nome, email, senha, confirmarSenha } = req.body;

  try {
    await fieldsValidation.validate({
      nome,
      email,
      senha,
      confirmarSenha,
    });

    const user = await UsersServices.create(nome, email, senha);

    if (typeof user === "string") {
      return res.status(400).json({
        message: user,
      });
    }

    return res.status(201).json({
      message: "Usuário criado com sucesso!",
    });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({
        message: err.errors[0],
      });
    } else {
      res.status(500).json({ message: err });
    }
  }
};

const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await UsersServices.show(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    return res.status(200).json({
      id: user[0].id,
      nome: user[0].nome,
      email: user[0].email,
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};
const updateUserProfile = async (req, res) => {
  const { nome, email, senha, confirmarSenha } = req.body;
  const userId = req.userId;

  try {
    await fieldsValidation.validate({
      nome,
      email,
      senha,
      confirmarSenha,
    });

    const user = await UsersServices.update(nome, email, senha, userId);

    if (typeof user === "string") {
      return res.status(400).json({
        message: user,
      });
    }

    return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({
        message: err.errors[0],
      });
    } else {
      return res.status(500).json({ message: err.message });
    }
  }
};

module.exports = { createUser, getUserProfile, updateUserProfile };
