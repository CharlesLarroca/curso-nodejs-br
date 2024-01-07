const express = require('express')

const app = express()

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

// rotas - endpoints

app.get('/', (req, res) => {
  
  //Ao inves de ser renderizada uma view, enviamos um obj js com key e value para ser acessada pelo navegador/aplicação em formado json
  res.json({
    message: 'Primeira rota criada com sucesso',
  })
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})