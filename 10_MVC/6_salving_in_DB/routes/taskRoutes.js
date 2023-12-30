//Importando o express e iniciando o router
const express = require('express')
const router = express.Router()

//Importando o controller
const TaskController = require('../controllers/TaskController')

//Criando rota para view uma task, neste caso o metodo create do controller
router.get('/add', TaskController.createTask)

//Criando rota para envio dos dados do create
router.post('/add', TaskController.createTaskSave)

//Criando rota onde serão apresentadas as tarefas
router.get('/', TaskController.showTasks)

module.exports = router

