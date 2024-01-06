const mongoose = require('mongoose')
const {Schema} = mongoose

//Criamos uma class com o metodo model do mongoose
//Parametros, Nome do model, instacio um schema para inserir a estrutura do model e dentro dessa instancia passamos as propriedades que o model terá e quais os tipos de dados serão aceitos
const Product = mongoose.model(
  'Product',
  new Schema({
    name: {type: String, require: true},
    image: {type: String, require: true},
    price: {type: Number, require: true},
    description: {type: String, require: true},
  })
)

module.exports = Product