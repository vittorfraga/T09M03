const yup = require("yup");

const sessionValidation = yup.object().shape({
  email: yup.string().email().required("Email é obrigatório!"),

  senha: yup.string().required("Senha é obrigatório!!"),
});

module.exports = sessionValidation;
