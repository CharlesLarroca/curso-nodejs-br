const mongoose = require('../db/conn')
const { Schema } = mongoose

const Pet = mongoose.model(
  'Pet',
  new Schema({
    name: {
      type: String,
      require: true
    },
    age: {
      type: Number,
      require: true
    },
    weight: {
      type: Number,
      require: true
    },
    color: {
      type: String, //Aqui será introduzido o caminho da imagem e nao o arquivo em si, por isso String
      require: true
    },
    images: {
      type: Array, //Assim possibilita que varios dados possam ser armazenados em um unico campo, no caso uma galeria de fotos
      required: true,
    },
    available: {
      type: Boolean //Determina true ou false para disponibilidade de adoção
    },
    user: Object, //Irá inserir informações do user, ao inves de criar uma relação entre as collections 
    adopter: Object //Irá inserir informações do adotante
  },
  {timestamps: true}),
   // Irá criar e atualizar as colunas createdAt e updatedAt
)

module.exports = Pet

