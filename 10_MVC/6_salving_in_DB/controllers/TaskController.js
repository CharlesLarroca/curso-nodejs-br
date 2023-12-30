const Task = require('../models/Task')

//Exportando o controller e criar metodos estaticos, visto que nao instanciaremos novos objs
module.exports = class TaskController {
    //Metodo para renderizar uma view, ou seja apresentar o form de criação de tarefas
    //Criamos a view dentro da pasta views para que seja renderiaza
    static createTask(req, res){
        res.render('tasks/create')
    }
    
    //Metodo para enviar os dados do form para o banco de dados
    static async createTaskSave (req, res){
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false
        }
        //Metodo para enviar os dados vindos da view para o DB atraves do model
        await Task.create(task)
        res.redirect('/tasks')
    }

    //Metodo para renderizar a view onde apresentará todas as tasks criadas
    static showTasks(req, res){
        res.render('tasks/all')
    }
}