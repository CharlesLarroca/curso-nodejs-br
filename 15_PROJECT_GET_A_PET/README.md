Projeto Get a Pet

Backend

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
22º resgatar os dados do pet pelo id findOne
23º removendo pet do sistema findOneAndDelete
24º atualizando o pet rota patch, metodo findOneAndUpdate
25º criando função para agendamento de visita, envio a solicitação de agendamento e recebo os dados do dono
26º concluindo a visita e alterando o status de disponibilidade

Front End
1º Iniciar um proj em react, npx create-react app ., instalar axios(para conexão com a api), events, react-icons, react-router-dom(realiza o roteamento de paginas, parecido com o router do express, ^5.3.0)
2º criar arquivo .env e criar variavel de ambiente para a url padrão que utilizamos, no caso localhost:5000
3º Configuro o ambiente e removo oque não será utilizado, mantendo por ex apenas App.js, index.css e index.js na pasta src e na public trocamos o icon e alteramos o title do html, limpamos os pacotes que nao estão sendo utilizados no app e index e inserimos um h1 para iniciar o front end, e para finalizar criaremos a estrutura de pastasa assets(arquivos estaticos), components(a estrutura do react é atreves de components(funções e paginas)), context(pasta que armazenará blocos de codigos reutilizaveis), hooks (blocos de codigo que funcionam como ganchos na aplicação, por ex a apresentação de flash messages) e utils(parecido com a pasta helpers)
4º utilizando alguns objetos do react-router e melhorar no css, alem de criar algumas rotas e paginas de login, home e register, importando e inserindo dentro da estrutura de roteamento
5º estruturando navbar e footer
6º estilando navbar e footer com o componentstyle ou css modules onde criamos um arquivo no mesmo nivel do component que receberá a estilização
7º Criando o component container e formulario de cadastro com component input criado por nós e finalizar com estilização
8º vincular front e back para enviar dados de registro ao DB, para isso será necessario criar um um obj para alterar o state de um user atraves de um hook chamado useState
9° criando hook de authenticação, que ira criar um context para comunicar a aplicação 
10° criar mensageria para validar erros usando um hook proprio useFlashMessage, criar um component de mensagens e estilizar, implementar mensagens dinamicas baseados no state do component
11º Authenticar user cadastrado, para isso salvaremos o token que foi criado no localstorage e recuperar o token e inserir no authorizarion
12º criar um condicional na nav para alterar as rotas de acesso a depender do estado de authenticação do user
13º criar função de logout
14º criar form para login e função de login
15º criar pagina de perfil e rota onde serão os dados e a imagem do user todas as alterações serão realizadas no front e back
16º criar formulario para edição do User e estiliza-lo
17º resgatar os dados do user metodo get será utilizado fazemos um api.get na rota de checkuser e passamos os dados da resposta para o setUSer
18º realizar o update dos dados do user realizamos um api.post na rota de updateuser, utilizaremos tambem o FormData para manipular e realizar um loop nos dados recebidos
19º Atualizar a imagem do user, primeiro precisaremos renderizar a img se ela existir e torna-la um preview, após o envio para o DB ela permanece como imagem do user, necessario usar o useState e criar uma url com base na url da api
20º componente de imagem, onde faremos as configs de tamanho e como a imagem será exibida
21° criando a lista de pets, component mypets, inserir na navbar quando logado, inserir o component e rota no app
22º pagina de cadastro do pet pet/add, criaremos o component form na pasta form para que possa ser reutilizado como cadastro ou edição, utilizaremos um inoput de select para escolher as cores do array que criamos no component
23º iniciar a pagina de mypets, primeiro preencheremos o state com os pets cadastrados, iniciaremos resgatando o token do localstorage, após isso chamamos a api fazendo um useEffect com verbo gets na rota pets/mypets e usando o token como referencia, configuraremos os bot~eos de concluir adoção, editar e excluir e realizaremos a estilização
24º função de excluir pet, onde pegamos o id do botão clicado relacionado a key id do pet, realizamos uma nova chamada da api com o verbo delete na rota delete, e simultaneamente atualizamos o state para uma nova lista sem o pet a ser excluido
25º estutura de edição do pet no component editPets, coloco a rota no app.js, criando o form e preenchendo com os dados, e utilizaremos os parementros da url, criamos uma função para realizar o update, inserimos o PetForm preenchendo com os dados vindos da api
26º criaremos a estrutura para apresentar os pets na home fazemos um get na api, após isso faremos um loop para apresentar os pets na home, e estilização
27º pagina com detalhes do pet, com botão para adoção, criamos o component e fazemos um get na api e inserimos o componente no App.js
28º criar a função de schedule, sera async e dentro do PetDetails onde apenas chamaremos a api para uma atualização e toda a func está criada no backend então precisamos chamar a função e fazer unm then e catch
29º criar pagina de adoções, inserimos a rota na navbar e o component no app.js, apresentamos a primeira foto de cada pet com nome e o contato do tutor e o status de adoção
30º conclusão da adoção

//Proximos passos
Validar motivo de flash messages de erro nao aparece o conteudo apenas o box, e somente nas funções onde a mensagem nao foi inserida manualmente, ex nome obrigatorio aparece, inserir mensagem com formato incorreto não

Adendo atualização do router dom, switch foi removido e no lugar entrou Routes, useHistory e agora useNavigate e nao precisa colocar o meto push , os components nao ficam dentro de route e sim em uma prop chamada element e o route vira um self closed
prop nova dentro da rota no app chamada exact, que identifica se aquela rota é exatamente a que queremos acessar