const yup = require("yup");

const fieldsValidation = yup.object().shape({
  nome: yup
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres!")
    .required("nome é obrigatório!"),

  email: yup.string().email().required("email é obrigatório!"),

  senha: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres!")
    .required("senha é obrigatório!!"),

  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("senha"), null], "As senhas não coincidem")
    .required("confirmarSenha é obrigatório! "),
});

module.exports = fieldsValidation;
