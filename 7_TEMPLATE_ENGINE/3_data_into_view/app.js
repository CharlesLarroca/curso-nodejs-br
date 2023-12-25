//Setup inical
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  //Criando dados para seres enviados para o view
  const user = {
    name: 'Gabrielle',
    surname: 'Larroca'
  }

  const idade = 24


  //no segundo parametro passamos os dado que desejamos que seja acessado e passado para a view
  res.render('home', {user, idade,})
})

app.listen(3000, () => {
  console.log('http://localhost:3000/')
})