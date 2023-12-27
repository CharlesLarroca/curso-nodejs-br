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
      return
    }
    res.redirect('/')
  })
})

//Retornando os dados da Database
app.get('/books', (req, res) => {
  //Query que que irá selecionar os dados que vamos retirar
  //metodo select, * signigica todas as colunas
  const sql = 'SELECT * FROM books'

  conn.query(sql, function(err, data){
    if(err){
      console.log(err)
      return
    }

    //Atribui a variavel os dados recuperados
    const books = data

    res.render('books', {books})
  })
})

//Rota e query para buscar um valor pelo id
app.get('/books/:id', (req, res) => {
  const id = req.params.id

  const sql = `SELECT * FROM books WHERE id = ${id}`
  conn.query(sql, function(err, data){
    if(err){
      console.log(err)
    }
    //o 0 é inserido pois o whrer vai trazer um array de objetos que se enquadram na busca, e no caso como no nosso caso será somente 1 valor, o index será o 0.
    const book = data[0]

    res.render('book', {book})
  })
})

//Rota para edição dos dados
app.get('/books/edit/:id', (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM books WHERE id = ${id}`

  conn.query(sql, function(err, data){
    if(err){
      console.log(err)
    }
    const book = data[0]

    res.render('editbook', {book})
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
