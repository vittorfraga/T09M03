const yup = require("yup");
const { insertUser } = require("../services/createUserService");
const fieldsValidation = require("../validations/createUserValidation");

const createUser = async (req, res) => {
  const { nome, email, senha, confirmarSenha } = req.body;

  try {
    await fieldsValidation.validate(
      {
        nome,
        email,
        senha,
        confirmarSenha,
      },
      { abortEarly: false }
    );

    await insertUser(nome, email, senha);

    return res.status(201).json({
      message: "Usuário criado com sucesso!",
    });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({
        message: err.errors,
      });
    } else {
      res.status(500).json({ message: err.message });

      console.log(err.message);
    }
  }
};

module.exports = createUser;
