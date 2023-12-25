const express = require ('express') // Importando express
const app = express() // executando o express
const port = 3000 // porta de acesso

//Importado o path e criando o caminho para acesso dos arquivos
const path = require('path')
const basePath = path.join(__dirname, 'templates')

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