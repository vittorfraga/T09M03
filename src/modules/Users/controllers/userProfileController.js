const yup = require("yup");
const userProfile = require("../services/userProfileService");
const fieldsValidation = require("../validations/createUserValidation");

const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await userProfile.show(userId);

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
    await fieldsValidation.validate(
      {
        nome,
        email,
        senha,
        confirmarSenha,
      },
      { abortEarly: false }
    );

    await userProfile.update(nome, email, senha, userId);

    return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({
        errors: err.errors,
      });
    } else {
      return res.status(500).json({ message: err.message });
    }
  }
};

module.exports = { getUserProfile, updateUserProfile };
