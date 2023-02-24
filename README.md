## variaveis de cada endpoint

- post/usuario
  {
  "nome":"teste dos santos",
  "email":"teste@email.com",
  "senha":"12345678",
  "confirmarSenha": "12345678"
  }

- post/login
  {
  "email":"teste@email.com",
  "senha":"12345678"
  }

## a partir daqui todas as rotas tem que ter o token no header

- get/usuario

- put/usuario
  {
  "nome":"teste Silva",
  "email":"teste@email.com",
  "senha":"12345678",
  "confirmarSenha": "12345678"
  }

- get/categoria

- post/transacao  
  {
  "tipo": "saida", //ou "entrada"
  "descricao": "Salário",
  "valor": 30000,
  "data": "2022-03-24T15:30:00.000Z",
  "categoria_id": 6
  }

- put/transacacao/:id
  {
  "tipo": "saida",
  "descricao": "Salário",
  "valor": 33333,
  "data": "2022-03-24T15:30:00.000Z",
  "categoria_id": 1
  }

- get/transacao
  aqui se for adicionar os filtros, eles tem que ser adicionados na rota por query params  
  seguindo a sintaxe filtro[]=Roupas por exemplo, so funciona se o nome for igual ao
  nome da tabela categorias

- listar pelo id, excluir e extrato necessitam apenas que o usuario esteja logado e o token seja enviado
