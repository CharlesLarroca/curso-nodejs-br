const {DataTypes} = require('sequelize')
const db = require('../db/conn')

// Importar o model a ser relacionado
const User = require('./User')


// Schema do Toughts
const Tought = db.define('Toughts', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})

// Relacionar models

Tought.belongsTo(User)
User.hasMany(Tought)

module.exports = Tought