const router = require('express').Router()
const PetController = require('../controllers/PetController')

// Middleware
//Caso nao seja inserido um token em authorization, o metodo create nao estará disponivel
const verifyToken = require('../helpers/verify-token')
//Para que seja inserido as imagens dos pets, usaremos este middleware com o metodo array, para que seja possivel o upload de multiplas images
const {imageUpload} = require('../helpers/image-upload')

router.post('/create', verifyToken, imageUpload.array('images'), PetController.create)

router.get('/', PetController.getAll)

router.get('/mypets', verifyToken, PetController.getAllUserPets)

router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions)

router.get('/:id', PetController.getPetById)

router.delete('/:id', verifyToken, PetController.removePetByID)

module.exports = router