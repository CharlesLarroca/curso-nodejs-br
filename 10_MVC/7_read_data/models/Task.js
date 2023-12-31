//Importando os datatypes, para determinar os tipos de dados que serão inseridos
const {DataTypes} = require('sequelize')

//Importando a conexão do DB
const db = require('../db/conn')

//Criando o schema, ou seja como será a estrutura da tabela(DB)
//No caso estamos criando uma ToDo List
const Task = db.define('Tasks', {
    title: {
        type: DataTypes.STRING,
        require: true,
    },
    description: {
        type: DataTypes.STRING,
        require: true,
    },
    done: {
        type: DataTypes.BOOLEAN,
        require: true,
    }
})

module.exports = Task