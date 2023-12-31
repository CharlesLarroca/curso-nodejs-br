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
    static async showTasks(req, res){
        //Metodo para resgatar os dados do DB e enviar para a view renderizar
        const tasks = await Task.findAll({raw: true})

        res.render('tasks/all',  {tasks})
    }

    //Metodo para remover uma task e redirecionar para a home
    static async removeTask (req, res){
        const id = req.body.id
        
        await Task.destroy({where: {id: id}})

        res.redirect('/tasks')
    }
    
}