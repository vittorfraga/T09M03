const yup = require("yup");

const sessionValidation = yup.object().shape({
  email: yup.string().email().required("email é obrigatório!"),

  senha: yup.string().required("senha é obrigatório!!"),
});

module.exports = sessionValidation;
