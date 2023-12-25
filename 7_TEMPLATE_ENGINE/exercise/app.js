const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const app = express()
const port = 3001

const hbs = exphbs.create({
  partialsDir:['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

const products = [
  {
    id: 1,
    title: 'Monitor Ultrawide 34"',
    body: 'imagem monitor.jpeg',
    price: 'R$ 1.500,00'
  },
  {
    id: 2,
    title: 'Cadeira DT3 Alera+',
    body: 'imagem cadeira.jpeg',
    price: 'R$ 1.250,00'
  },
  {
    id: 3,
    title: 'Suporte Monitor 100x25 Preto',
    body: 'imagem suporte.jpeg',
    price: 'R$ 100,00'
  },
  {
    id: 4,
    title: 'Mouse Darmoshark Preto',
    body: 'imagem mouse.jpeg',
    price: 'R$ 250,00'
  },
  {
    id: 5,
    title: 'Teclado Mecanico Machenike k500',
    body: 'imagem teclado.jpeg',
    price: 'R$ 200,00'
  },
  {
    id: 6,
    title: 'Mousepad 90x40 Preto',
    body: 'imagem mousepad.jpeg',
    price: 'R$ 80,00'
  },
  {
    id: 7,
    title: 'Mesa com regulagem de altura 120x70 Preta',
    body: 'imagem mesa.jpeg',
    price: 'R$ 1.500,00'
  },
  {
    id: 8,
    title: 'Headset JBL',
    body: 'imagem headset.jpeg',
    price: 'R$ 350,00'
  },
  {
    id: 9,
    title: 'Cord Teclado Preto',
    body: 'imagem cord.jpeg',
    price: 'R$ 70,00'
  },
]

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('home', {products})
})

//Rota para url dinamica
app.get('/product/:id', (req, res) => {
  const product = products[parseInt(req.params.id)-1] // Acesso ao dado dentro do array pelo parametro id
  res.render('product', {product})
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})