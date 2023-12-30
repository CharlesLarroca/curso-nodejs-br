const {Sequelize} = require('sequelize') //importando apenas apenas como objeto o sequelize do package sequelize e em seguida instanciando a classe

//Paramentros nome do db, usuario, senha, obj com configs
const sequelize = new Sequelize('nodesequelize', 'root', '', {
    host: 'localhost',  //ambiente que estará o DB
    dialect: 'mysql' //tipo de db que queremos integrar(mariadb, mysql e etc)
})

//Foi removido para que o model seja aplicado no banco

// try {
//     sequelize.authenticate()
//     console.log('Conectamos com sucesso com o Sequelize.')
// } catch (error) {
//     console.log('Não foi possivel conectar: ', error)
// }

module.exports = sequelize

