//Importando o express e iniciando o router
const express = require('express')
const router = express.Router()

//Importando o controller
const TaskController = require('../controllers/TaskController')

//Criando rota para adicionar uma task, neste caso o metodo create do controller
router.get('/add/', TaskController.createTask)

//Criando rota onde serão apresentadas as tarefas
router.get('/', TaskController.showTasks)

module.exports = router

