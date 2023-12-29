const {Sequelize} = require('require') //importando apenas apenas como objeto o sequelize do package sequelize e em seguida instanciando a classe

//Paramentros nome do db, usuario, senha, obj com configs
const sequelize = new Sequelize('nodesequelize', 'root', '', {
    host: 'localhost' //ambiente que estará o DB
})

