const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

//Rotas de login onde acionar os metodos de login
router.get('/login', AuthController.login)
router.post('/login', AuthController.loginPost)

//Rotas de cadastro onde acionar os metodos de cadastro
router.get('/register', AuthController.register)
router.post('/register', AuthController.registerPost)

//Rota para logout
router.get('/logout', AuthController.logout)

module.exports = router