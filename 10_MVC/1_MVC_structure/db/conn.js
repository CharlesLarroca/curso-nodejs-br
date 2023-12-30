//Importando Sequelize
const { Sequelize } = require('sequelize')

//Instanciando conexão
//Nome identico ao do DB, user padrão, senha padrão, configs(host e dialect)
const sequelize = new Sequelize('nodemvc', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

//Autenticando conexão
try {
    sequelize.authenticate()
    console.log('Conectado ao MySQL')
    console.log('http://localhost:3000/')
} catch (error) {
    console.log(`Falha ao conectar: ${error}`)
}

exports.default = sequelize