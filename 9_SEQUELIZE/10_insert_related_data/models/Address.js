const {DataTypes} = require('sequelize')
const db = require('../db/conn')
const User = require('./User') // Model que terá relação

const Address = db.define('Addresses', {
    street: {
        type: DataTypes.STRING,
        require: true
    },
    number: {
        type: DataTypes.STRING, // neste caso por ser numero de resindendia é string
        require: true
    },
    city: {
        type: DataTypes.STRING,
        require: true
    }
})

//Criar relação com o metodo belongsTo, ou seja criamos a relação onde o endereço pertence ao user
Address.belongsTo(User)

module.exports = Address