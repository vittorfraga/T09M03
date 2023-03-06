const { sign } = require("jsonwebtoken");
const yup = require("yup");

const sessionsService = require("./SessionsService");
const sessionValidation = require("./SessionsValidations");

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    await sessionValidation.validate({
      email,
      senha,
    });

    const user = await sessionsService.createSession(email, senha);

    if (typeof user === "string") {
      return res.status(400).json({
        message: user,
      });
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
        message: err.errors[0],
      });
    } else {
      console.log(err);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
};

module.exports = { login };
