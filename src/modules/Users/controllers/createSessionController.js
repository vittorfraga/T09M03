const { sign } = require("jsonwebtoken");
const yup = require("yup");

const createSession = require("../services/createSessionService");
const sessionValidation = require("../validations/createSessionValidation");

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    await sessionValidation.validate(
      {
        email,
        senha,
      },
      { abortEarly: false }
    );

    const user = await createSession(email, senha);

    if (user.error) {
      return res.status(401).json({ message: user.error });
    }

    const token = sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.SECRET,
      { expiresIn: "24h" }
    );

    const usuario = {
      id: user.id,
      nome: user.nome,
      email: user.email,
    };

    return res.status(200).json({ usuario, token });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({
        message: "Erro de validação",
        errors: err.errors,
      });
    } else {
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
};

module.exports = login;
