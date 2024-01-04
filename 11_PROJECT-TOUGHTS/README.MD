Detalhes do Projeto Toughts

Estrutura da página

NavBar - Icone lampada canto esquerdo, links(pensamentos, entrar e registrar)

Pagina inicial - titulo dinamico, input e botão de busca, barra de ordenação e pensamentos com autor

Pagina de login - email, senha botão de login, link para pagina de cadastro

Pagina de registro - nome, email, senha e confirmação de senha, botão de cadastro, link para pagina de login

Pagina para inserir pensamentos/dash após login ou cadastro - botão para inserir pensamentos, dashboard com pensamentos ja inseridos

Utilizaremos middlewares de authentificação, flash messages, ferramentas de busca


1º Passo - Estrutura Inicia, seguiremos a estrutura inicial vista ate o momento onde utilizamos o metodo MVC e suas pastas, e as tecnologias Express, Handlebars, bcrypt(para criptografia e descriptografia de senha), connect-flash(para flash messages), cookie-parser e cookie-session(salvar sessões de login), express-flash(flash-message), express-session(autenticação), mysql2, session-file-store(salvar sessões em arquivos) e Sequelize

    - Criar pastas
    - Importar os pacotes
    - Criar conexão com MySQL
    - Configurar app.js
    - Criar layout

2º Passo - Criação dos models User e Tought
    Tought - importar datatypes, model User e conexão db
              Schema - titulo em string, null false e require true
              Relacionar os models com belongsTo() e hasMany()
              Exportar e importar no app.js
    
    User - importar datatypes e conexão db
            Schema - nome, email e senha em string e require true
            Exportar e importar no app.js

3º Passo - Criar home do projeto, rota de home e css do layout
    toughtsRoutes - importar express e instanciar o Router() e importar o controller
    ToughtsController - importar models, criar metodo static async para render da home exportar e importar rota e controller no index

4º Passo - Criar autenticação
    Autenticação - criar rota e controller(criar metodo para render de login e register)
    Criar User e Senhas - form de registro e criar rota post e metodo dentro do controller para enviar ao DB e iniciar utilização de flash messages
    Login e logout - metodo findOne para recuperar dados do db e .compareSync
    Middleware de validação do login

5º Passo - Pagina de toughts e formulario de toughts
    Enviar dados para o db e realizar um each dentro da dashboard meus pensamentos
    Metodo includes dentro do findOne e um map para resgatar apenas o title

6º passo - Homepage, busca e ordenação, utilizando uma unica rota e metdo que seria o show toughts