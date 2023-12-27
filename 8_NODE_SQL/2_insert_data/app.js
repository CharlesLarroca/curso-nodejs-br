const express = require ('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

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

//Rota para inserir dados vindos do form html
app.post('/books/insertbook', (req, res) => {
  //Pegando os valores inseridos dentro dos inputs com os names abaixo
  const title = req.body.title
  const pageqty = req.body.pageqty

  //Salvando o comando a ser enviado para a conn, seguindo o padrão de comandos do sql metodo query
  const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`

  //executo o metodo query, e caso nao tenha erros, ocorrerá um redirect para a rota home '/
  conn.query(sql, function(err){
    if(err){
      console.log(err)
    }
    res.redirect('/')
  })
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
  console.log('http://localhost:3000')
})
