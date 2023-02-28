const yup = require("yup");
const { insertUser } = require("../services/createUserService");
const fieldsValidation = require("../validations/createUserValidation");

const createUser = async (req, res) => {
  const { nome, email, senha, confirmarSenha } = req.body;

  try {
    await fieldsValidation.validate({
      nome,
      email,
      senha,
      confirmarSenha,
    });

    const user = await insertUser(nome, email, senha);

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

module.exports = createUser;
