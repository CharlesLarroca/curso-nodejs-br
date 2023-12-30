const Task = require('../models/Task')

//Exportando o controller e criar metodos estaticos, visto que nao instanciaremos novos objs
module.exports = class TaskController {
    //Metodo para renderizar uma view, ou seja apresentar o form de criação de tarefas
    //Criamos a view dentro da pasta views para que seja renderiaza
    static createTask(req, res){
        res.render('/tasks/create')
    }
}