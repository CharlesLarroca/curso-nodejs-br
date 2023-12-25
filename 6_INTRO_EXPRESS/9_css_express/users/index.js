const express = require('express')
const router = express.Router()
const path = require('path')

const basePath = path.join(__dirname, '../templates')

//rota get que mostrar o form para o user
router.get('/add', (re, res) => {
  res.sendFile(`${basePath}/userForm.html`)
})

//rota de post que enviara os dados da req
router.post('/save', (req,res) => {
  const name = req.body.name
  const age = req.body.age

  console.log(`The users name is ${name} and he/she is ${age} years old.`)

  res.sendFile(`${basePath}/userForm.html`)//retorna para a pagina de form
})

//Nova rota de middleware
router.get('/:id', (req, res) => {
  const id = req.params.id // atraves desta info pode se fazer a busca do user no database pelo id por ex
  console.log(`Seeking the user by id ${id}`)

  res.sendFile(`${basePath}/users.html`)
})

module.exports = router
