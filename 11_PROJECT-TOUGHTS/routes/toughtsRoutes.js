const express = require('express')
const router = express.Router()
// Importa controler
const ToughtController = require('../controllers/ToughtController')

// Importando helpers e chamando a função desejada
const checkAuth = require('../helpers/auth').checkAuth

//Antes de seguir para o controller e renderizar toughts, é validado autentificação
// Rota para dashboard
router.get('/dashboard', checkAuth, ToughtController.dashboard)

// Rota para criar pensamento
router.get('/add', checkAuth, ToughtController.createTought)
// Rota para enviar pensamento para DB
router.post('/add', checkAuth, ToughtController.createToughtPost)

// Rota paras edição dos pensamentos
router.get('/edit/:id', checkAuth, ToughtController.updateTought)
router.post('/edit/', checkAuth, ToughtController.updateToughtPost)

//Rota para exluir pensamento
router.post('/remove', checkAuth, ToughtController.removeTought)

router.get('/', ToughtController.showToughts)

module.exports = router