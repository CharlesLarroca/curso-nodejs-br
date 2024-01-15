Projeto Get a Pet

1º Criamos as pastas backend e frontend
2º Iniciamos um projeto na pasta do backend e instalamos o bcrypt para criptografia de senha, cookei-parse, cors auxiliar para enviarmos req para o mesmo dominio(visto que aplicação e api estarão no mesmo server), express, jsonwebtoken(para autentificação do backend) mongoose multer(para upload de fotos) e nodemon
3º app.js onde será o ponto inicial do aplicativo
4º conf inicial de cors, listen, express.json e static
5º criação dos models e conexão do DB (mongoose, inserindo a uri padrão e o nome do banco)
6º criação de user rotas e controller do User, rota de register tipo post, metodo async register no controller, e configuração do postman(variavel com o endereço da url localhost:5000, pastas user e pets)
7º criação do metodo para criação de registro de user e suas validações, validar envio de dados de registro para o mongodb
8º criar uma função que poderá ser reutilizada no login, criaremos na pasta helpers, esta função criará um token para o usuario
9º criar a função de login, onde será comparado a senha inserida com o bcrypt e também validar se o email ja existe cadastrado no sistema
10º criar nova função para resgatar o user que está logado através do token, para isso criamos uma rota get e o metodo para checar se o token foi enviado na request criada no postman, para isso basta inserir o token gerado na variavel da collection no postman e selecionar bearer token no authorization
11º criaremos um novo helper para extrair o token da req
12º resgato o user pelo id
13º verificação do token do user, criamos um novo middeware que validará se o token enviado pelo user é valido
14º iniciamos a parte de edição do user onde resgatamos o user pelo id e validamos se o mesmo existe pelo token, realizamos as validações dos dados enviados para edição, utilizamos o verbo patch na rota
15º upload de imagens, usaremos o multer que será configurado em um novo helper, nele usaremos o metodo diskstorage e passaremos o destination, onde as imagens ficarão salvas e também o nome do arquivo filename

16º iniciaremos as rotas e metodos dos pets, incluindo o upload de diversas imagens formando uma galeria, criado a rota, controller, importado ao index.
17º metodo para registrar um pet no sistema, rota pets/create, utilizaremos middlewares de validão, neste caso o verify-token, importamos na rota e inserimos no postman na aba authorization
18º configurado o envio de multiplas images atraves do helper image-upload e com o metodo array, realizado um mapda imagens enviadas para serem salvas com o metodo filename do helper
19º Resgatar todos os pet cadastrados
20° resgatar os pets cadastrados no user
21º resgatar todas as adoções que o user quer realizar
22º resgatar os dados do pet pelo id
23º removendo pet do sistema
24º atualizando o pet
25º criando função para agendamento de visita