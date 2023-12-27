const express = require ('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

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
  // const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`

  //Vamos aplicar uma segurança no envio dos dados utilizando as ?, sen ?? para as colunas e ? para os dados
  const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`
  //Esse é o segundo passo, onde passamos um array seguindo a ordem exata das colunas e valores e sem passados
  const data = ['title', 'pageqty', title, pageqty]

  //executo o metodo query, e caso nao tenha erros, ocorrerá um redirect para a rota home '/
  pool.query(sql, data, function(err){
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

  pool.query(sql, function(err, data){
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

  const sql = `SELECT * FROM books WHERE ?? = ?`
  const data = ['id', id]

  pool.query(sql, data, function(err, data){
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
  
  const sql = `SELECT * FROM books WHERE ?? = ?`
  const data = ['id', id]

  pool.query(sql, data, function(err, data){
    if(err){
      console.log(err)
    }
    const book = data[0]

    res.render('editbook', {book})
  })
})

//Rota de Update
app.post('/books/updatebook', (req, res) => {
  //acesso ao id pelo corpo, neste caso no input hidden
  const id = req.body.id
  const title = req.body.title
  const pageqty = req.body.pageqty
  //variaveis devem sempre ser colocadas entre '', apenas o id nao é necassario pois ele é dinamico na database
  const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`
  const data = ['title', title, 'pageqty', pageqty, 'id', id]

  pool.query(sql, data, function(err){
    if (err) {
      console.log(err)
    }

    res.redirect('/books')
  })
})

//RoTa de delete
app.post('/books/remove/:id', (req, res) => {
  //acesso ao id pela url
  const id = req.params.id

  const sql = `DELETE FROM books WHERE ?? = ?`
  const data = ['id', id]

  pool.query(sql,  function(err){
    if (err) {
      console.log(err)
    }

    res.redirect('/books')
  })
})

//criando a conexão com o banco de dados
// const conn = mysql.createConnection({
//   host: 'localhost', 
//   user: 'root',
//   password: '',
//   database: 'nodemysql'
// })

//Estabelecendo a conexão
// conn.connect(function (err) {
//   if(err){
//       console.log (err)
//   }
// })

//alteramos os passos acima pelo abaixo acima pelo pool e por isso trocamos todos os conn das rotas por pool


console.log('Conectado ao MySQL')
  app.listen(3000)
  console.log('http://localhost:3000')
