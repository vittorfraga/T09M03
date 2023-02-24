## variaveis de cada endpoint

- post/usuario : alem de tudo o back espera receber a confirmacao da senha, ex:
     - "senha":"12345678",
    -  "confirmarSenha": "12345678"
 


## a partir daqui todas as rotas tem que ter o token no header

- get/usuario

- put/usuario, alem de tudo o back tambem espera receber a confirmacao da senha:
   - "senha":"12345678",
   - "confirmarSenha": "12345678"
  



- post/transacao :
  
  - "tipo": "saida", //ou "entrada"

  

- put/transacacao/:id:
  
   -"tipo": "saida", //ou "entrada"


- get/transacao :
  `aqui se for adicionar os filtros, eles tem que ser adicionados na rota por query params  
  seguindo a sintaxe filtro[]=Roupas por exemplo, so funciona se o nome for igual ao
  nome da tabela categorias`

- listar pelo id, excluir e extrato necessitam apenas que o usuario esteja logado e o token seja enviado
