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

app.get('/users/create', (req, res) => {
  res.render('adduser')
})

app.post('/users/create', async (req, res) => {
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter //o valor do checked do checkbox vem como on ou off, e no banco ele receberá o valor de 1 ou 0 (true ou false)

  if(newsletter === 'on'){
    newsletter = true
  } else {
    newsletter = false
  }

  console.log(req.body)

  //com este metodo os dados serão enviados para as respectivas colunas
  await User.create({ name, occupation, newsletter }) // tornando assincrono evita que a pagina fique carregando durante a criação e envio dos dados ao DB

  res.redirect('/')

})

app.get('/', (req, res) => {
  res.render('home')
})

//Criasse a conexão e juntamente com ela a criação da tabela
conn.sync()
  .then(() => {
    app.listen(3000)
    console.log('http://localhost:3000')
  })
  .catch(err => console.log(err))