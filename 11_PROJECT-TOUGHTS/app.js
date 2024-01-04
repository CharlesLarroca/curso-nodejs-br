const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session') // Pacote para criar as sessões
const FileStore = require('session-file-store')(session) // Pacote para salvar as sessões de login
const flash = require('express-flash') // Pacote para mensagens da aplicação
const bcryptjs = require('bcryptjs') // Pacote para criptografia de senhas

const app = express()

const conn = require ('./db/conn') // Importando conexão

// Models
const Tought = require('./models/Tought')
const User = require('./models/User')

// Import Rotas
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')

// Import Controllers
const ToughtController = require('./controllers/ToughtController')

// Template Engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// Receber resposta do body
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

// Middleware para as sessões
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret', // impede a sessão de quebrar
        resave: false, // impede que ao a sessão cair, a mesma seja reconectada
        saveUninitialized: false,
        store: new FileStore({
            logFn: function(){}, // Função para login da sessão
            path: require('path').join(require('os').tmpdir(), 'sessions') // Local onde serão salvas as sessões
        }),
        cookie: ({
            secure: false,
            maxAge: 360000, // Tempo máximo da sessão 1 dia em ms
            expires: new Date(Date.now() + 360000), // Valida quando expirar, no caso o momento do login + 1 dia.
            httpOnly: true // Pois não estamos utilizando certificado de segurança pois estamos rodando via localhost, ou seja nao usaremos o HTTPS, em produção seria necessário
        })
    }),
)

// Flash messages(status de sistemas)
app.use(flash())

// Atribuir sessão para res
app.use((req, res, next) => {
    // Validação se user está logado para passar os dados do user da req para a res
    if(req.session.userid) {
        res.locals.session = req.session
    }

    next()
})

app.use(express.static('public'))

// Usando as rotas
app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)

// Maneira de que a home seja mostrada sem o uso do localhost:3000/toughts, apenas localhost:3000/
app.get('/', ToughtController.showToughts)

conn
    //.sync({force: true})
    .sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('http://localhost:3000/')
        })
    })
    .catch(err => console.log(err)) // realizando conexão