const express = require('express')
const cors = require('cors')

const app = express()

// Config JSON Response, não necessita configurar urlencoded pois queremos somente respostas em json
app.use(express.json())

//Solve Cors, configuração para podermos utilizar a api e aplicação no mesmo server, no caso o localhost
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

//Arquivos estaticos
app.use(express.static('public'))

//Rotas

app.listen(5000, () => {
  console.log('http://localhost:5000')
})