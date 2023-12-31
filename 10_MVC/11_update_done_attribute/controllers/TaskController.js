const { raw } = require('express')
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
        //metodo para apagar os dados salvos no id passado
        await Task.destroy({where: {id: id}})

        res.redirect('/tasks')
    }

    //Metodo para editar uma task
    static async updateTask(req, res){
        const id = req.params.id
        //Metodo para localizar os dados do id passado
        const task = await Task.findOne({where: {id: id}, raw: true})
        res.render('tasks/edit', {task})
    }

    //Metodo para salva edição da task
    static async updateTaskSave(req, res){
        const id = req.body.id

        const task = {
            title: req.body.title,
            description: req.body.description,
        }
        //Metodo para atualizar os dados da task no DB
        await Task.update(task, {where : {id: id}})

        res.redirect('/tasks') 
    }

    static async toggleTaskStatus(req, res){
        const id = req.body.id

        const task = {
            done: req.body.done === '0' ? true : false //validação para alterar o status
        }
        //Metodo para atualizar o status da task no DB
        await Task.update(task, {where : {id: id}})

        res.redirect('/tasks') 
    }
    
}