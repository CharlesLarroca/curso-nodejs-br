//Setup inical
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {

  //Lista para trabalhar o each 
  const items = ['item a' , 'item 2', 'item 3']

  res.render('dashboard', {items})
})

app.get('/', (req, res) => {
  //Criando dados para seres enviados para o view
  const user = {
    name: 'Gabrielle',
    surname: 'Larroca'
  }

  const idade = 24

  //Dado para usar na condicional, onde caso seja true apresentará oque for desejado dentro if
  const auth = true
  //else
  const approved = false

  //no segundo parametro passamos o dado que desejamos que seja acessado e passado para a view
  res.render('home', {user, idade, auth, approved})
})

app.listen(3000, () => {
  console.log('http://localhost:3000/')
})