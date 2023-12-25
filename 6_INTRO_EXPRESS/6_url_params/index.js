const express = require ('express') // Importando express
const app = express() // executando o express
const port = 3000 // porta de acesso

//Importado o path e criando o caminho para acesso dos arquivos
const path = require('path')
const basePath = path.join(__dirname, 'templates')

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

//Nova rota
app.get('/users/:id', (req, res) => {
  const id = req.params.id // atraves desta info pode se fazer a busca do user no database pelo id por ex
  console.log(`Seeking the user by id ${id}`)

  res.sendFile(`${basePath}/users.html`)
})

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