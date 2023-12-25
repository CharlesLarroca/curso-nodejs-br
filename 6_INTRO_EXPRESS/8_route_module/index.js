const express = require ('express') // Importando express
const app = express() // executando o express
const port = 3000 // porta de acesso

//Importado o path e criando o caminho para acesso dos arquivos
const path = require('path')
const basePath = path.join(__dirname, 'templates')

const users = require('./users') //importamos o arquivo onde as rotas estão salvas

//Validar autentificação(simulado) usando o middleware
const checkAuth = function(req, res, next){
  req.authStatus = true //determina se user está logado ou nao
  if (req.authStatus) {
    console.log('Keep Going, you are logged in.')
    next()//informa que está apto a ir a proxima parte do codigo, neste caso o send file
  } else {
    console.log('Please login, you are not logged in.')
  }
}

//Utilizando o middleware
app.use(checkAuth)

//lendo o body
app.use(
  express.urlencoded({
    extended: true
  }),
)

app.use(express.json()) // torna possivel a leitura dos dados vindos do req.body convertendo em .JSON

app.use('/users', users)

//Get representa o verbo http, ou seja usario pedindo para visualizar uma pagina
// / - seria a url, ou rota principal
// req - informação enviado pelo user
// res -  informação que enviamos ao user
app.get('/', (req, res) => {
  //sendFile envia um arquivo como resposta, infoma o caminho e uma fn para err(opcional)
  res.sendFile(`${basePath}/index.html`)
})

//Ouvindo a aplicação na porta informada
app.listen(port, () => {
  console.log(`App running on port ${port}`)
  console.log(`http://localhost:${port}/`)
})