const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// read body
app.use(
  express.urlencoded({
    extend: true
  })
)

app.use(express.json())

app.listen(3000, () => {})

