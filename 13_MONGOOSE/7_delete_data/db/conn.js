const mongoose = require('mongoose')

//Criaremos uma func async para conexão
async function main(){
  //Metodo connect para conexão com o DB 
  //Passamos como atributo a uri padrão do mongobd e o nome do banco de dados
  await mongoose.connect('mongodb://localhost:27017/testemongoose')
  console.log('Conectado ao MongoDB via Mongoose')
}

main()
  .catch(err => console.log(err))

module.exports = mongoose