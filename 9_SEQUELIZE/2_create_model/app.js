const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const User = require('./models/User')

const app = express()

//Midleware para capturar os dados do body e converter para .JSON
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('home')
})

//Criasse a conexão e juntamente com ela a criação da tabela
conn.sync()
  .then(() => {
    app.listen(3000)
  })
  .catch(err => console.log(err))