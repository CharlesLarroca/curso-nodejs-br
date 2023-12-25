const express = require('express')
const app = express()
const path = require('path')

const port = 5000
const basePath = path.join(__dirname, 'templates')

const pages = require('./routes')

app.use('/pages', pages)

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}/pages/`)
})