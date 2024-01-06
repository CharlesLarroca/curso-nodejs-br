const { MongoClient } = require('mongodb')

// Protocolo do mongo mais o ip e nome do banco
const uri = "mongodb://localhost:27017/testemongodb"

// Instanciando a classe e passando a "url"
const client = new MongoClient(uri)

// Função async para conectar
async function run() {
  try {
    // Metodo para conectar
    await client.connect()
    console.log('Conectando ao MongoDB!')
  } catch (error) {
    console.log(error)
  }
}

// Executando a função
run()

module.exports = client