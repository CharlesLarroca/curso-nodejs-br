const multer = require('multer')
const path = require('path')

// Destination to store images
const imageStore = multer.diskStorage({
  // Passamos uma req, um arquivo e uma callback
  destination: function(req, file, cb){
    // Como teremos imagens de users e pets, usaremos uma variavel ao inves de uma const para a pasta onde será salvo os arquivos
    let folder = ''
    // Validamos se a url que veio na req é de user ou pet
    if (req.baseUrl.includes('users')) {
      folder = "users"
    } else if (req.baseUrl.includes('pets')) {
      folder = "pets"
    }
    // callback onde informará a pasta a ser salva as images
    cb(null, `public/images/${folder}`)
  },
  // Como será salvo o nome do arquivo
  filename: function (req, file, cb){
    // Estamos utilizando o Date.now que atribuirá a hora que o arquivo foi enviado mais a extensão do nome original do arquivo, no caso jpeg, png e etc
    cb(null, Date.now()+String(Math.floor(Math.random()*1000)+path.extname(file.originalname)))
  },
})

// Configurando o upload do arquivo
const imageUpload = multer({
  storage: imageStore,
  // Filto de arquivos que serão upados, regex que valida se no final do nome original possui png ou jpeg
  fileFilter(req, file, cb){
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error('Por favor envie um arquivo em formato .png ou .jpg!'))
    }
    cb(undefined, true)
  }
})

module.exports = {imageUpload}