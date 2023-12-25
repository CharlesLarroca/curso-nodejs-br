const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('home', {layout:false})//após ter um layout este atributo será removido
})

app.listen(3000, () => {
  console.log('http://localhost:3000/')
})