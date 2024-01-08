const express = require('express')

const app = express()

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

// rotas - endpoints

app.post('/createproduct', (req, res) =>{
  const name = req.body.name
  const price = req.body.price

  console.log(name)
  console.log(price)

  res.json({message: `O produto ${name} foi criado com sucesso e seu preço é de R$ ${price}`})
})

app.get('/', (req, res) => {
  
  //Ao inves de ser renderizada uma view, enviamos um obj js com key e value para ser acessada pelo navegador/aplicação em formado json
  res.json({
    message: 'Primeira rota criada com sucesso',
  })
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})