const express = require('express')
const exphbs = require('express-handlebars')

//Instanciado Express
const app = express()

//Importando conexão
const conn = require('./db/conn')

//Importando os Models
const Task = require('./models/Task')

//Importando as rotas
const tasksRoutes = require('./routes/taskRoutes')

//Utilizando a engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//Middleware para leitura de dados vindos do body da req(dados vindos do user) e converter em JSON
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

//Utilizando os arquivos estaticos(css)
app.use(express.static('public'))

//Utilizando as rotas
app.use('/tasks', tasksRoutes)

//Sincronizando Model com DB
conn.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('http://localhost:3000/tasks/')
        })
    })
    .catch(err => console.log(err))