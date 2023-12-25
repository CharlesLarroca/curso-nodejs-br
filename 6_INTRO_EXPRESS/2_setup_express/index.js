const express = require ('express') // Importando express
const app = express() // executando o express
const port = 3000 // porta de acesso

//Get representa o verbo http, ou seja usario pedindo para visualizar uma pagina
// / - seria a url, ou rota principal
// req - informação enviado pelo user
// res -  informação que enviamos ao user
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Ouvindo a aplicação na porta informada
app.listen(port, () => {
  console.log(`App running on port ${port}`)
  console.log(`http://localhost:${port}/`)
})