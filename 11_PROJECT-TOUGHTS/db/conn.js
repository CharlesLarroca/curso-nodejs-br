const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('nodetoughts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectado ao MySQL')
} catch (error) {
    console.log('Não possivel conectar ao MySQL!')
}

module.exports = sequelize