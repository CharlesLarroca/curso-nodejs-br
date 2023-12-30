const {DataTypes} = require('sequelize') // onjeto dentro do sequelize que da acesso a todos os tipos de dados do banco(string, number e etc)

//chamo a conexão com o banco pois ocorrerá a integração 
const db = require('../db/conn')

//Definições do model, nome e as propriedades(colunas) que terá a tabela
const User = db.define('Users', {
    //aqui determinamos as propriedade e que tipo de dado será inserido em cada coluna
    name: {
        type: DataTypes.STRING,
        allowNull: false, //determina se a coluna pode ou não ficar com valor null
    },
    occupation: {
        type: DataTypes.STRING,
        require: true, // determina se a coluna pode ou não ficar com valor vazio
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
    },
})

module.exports = User