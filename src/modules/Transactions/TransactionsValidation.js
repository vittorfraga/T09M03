const yup = require("yup");

const transactionsFieldsValidation = yup.object().shape({
  tipo: yup
    .string()
    .oneOf(["entrada", "saída", "saida"])
    .required("O tipo é obrigatório!"),

  descricao: yup.string().required("A descrição é obrigatória!"),

  valor: yup.number().required("O valor é obrigatório!"),

  data: yup
    .date("Informe um formato de data válido")
    .required("A data é obrigatória!"),

  categoria_id: yup.number().required("A categoria_id é obrigatória!"),
});

module.exports = transactionsFieldsValidation;
