const mongoose = require('../db/conn')
const { Schema } = mongoose

//Nome do Model, 
//Schema com os campos
const User = mongoose.model(
  'User',
  new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String, //Aqui será introduzido o caminho da imagem e nao o arquivo em si, por isso String
    },
    phone: {
      type: String,
    },
  },
  {timestamps: true}), // Irá criar e atualizar as colunas createdAt e updatedAt,
)

module.exports = User