const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const User = require('./models/User')
const Address = require('./models/Address')

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
  //com este metodo os dados serão enviados para as respectivas colunas
  await User.create({ name, occupation, newsletter }) // tornando assincrono evita que a pagina fique carregando durante a criação e envio dos dados ao DB

  res.redirect('/')

})

//Rota para abrir uma pagina com os detalhes do user clicado
app.get('/users/:id', async(req, res) => {
  const id = req.params.id // recebe o id vindo da url
  //usa o id enviado para localizar o user e enviar dos dados para a nova pagina
  const user = await User.findOne({raw: true, where: {id:id}})

  res.render('userview', {user})
})

//Rota para remover um user
app.post('/users/delete/:id', async (req, res) => {
  const id = req.params.id
  //Não precisa inserir em uma variavel
  await User.destroy({where: {id:id}})

  res.redirect('/')
})

//Rotas para carregar pagina de edição o user
app.get('/users/edit/:id', async (req, res) => {
  const id = req.params.id

  try {
    //Removemos o raw e inserimos o include e o nome do model Address. assim recuperando todos os endereços deste user
    const user = await User.findOne({include: Address , where:{id: id}})
    //Aqui editaremos a maneira como os dados serão exibidos com o metodo get e plain true e os dados serão exibidos na pagina de edit do user
  res.render('useredit', {user: user.get({plain: true})})
  } catch (error) {
    console.log(error)
  }
  
})

//rota para realizar update
app.post('/users/update', async (req, res) => {
  const id = req.body.id
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter 
  if(newsletter === 'on'){
    newsletter = true
  } else {
    newsletter = false
  }

  const userData = {
    id,
    name,
    occupation, 
    newsletter
  }

  await User.update(userData, {where: {id: id}})

  res.redirect('/')
})

//Rota para envio de end
app.post('/address/create', async (req, res) => {
  const UserId = req.body.UserId
  const street = req.body.street
  const number = req.body.number
  const city = req.body.city

  const addressData = {
    UserId,
    street,
    number,
    city
  }

  await Address.create(addressData)

  res.redirect(`/users/edit/${UserId}`)
})

//Rota Home apresentando os dados dentro do DB
app.get('/', async (req, res) => {
  const users = await User.findAll({raw: true}) // puxo os dados e ja converto em um array de objs
  res.render('home', {users: users})
})

//Criasse a conexão e juntamente com ela a criação da tabela
conn
  .sync()
  //.sync({force: true}) // apaga todos os dados e recria a tabela
  .then(() => {
    app.listen(3000)
    console.log('http://localhost:3000')
  })
  .catch(err => console.log(err))