const express = require ('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

  app.engine('handlebars', exphbs.engine())
  app.set('view engine', 'handlebars')

  app.use(express.static('public'))

  app.get('/', (req, res) => {
    res.render('home')
  })

  //criando a conexão com o banco de dados
  const conn = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: '',
    database: 'nodemysql'
  })

  //Estabelecendo a conexão
  conn.connect(function (err) {
    if(err){
        console.log (err)
    }

    console.log('Conectado ao MySQL')

    app.listen(3000)
  })
