const Tought = require('../models/Tought')
const User = require('../models/User')

//Operador para realizar buscas com query no db
const { Op } = require('sequelize')

module.exports = class ToughtController{
    //Metodo para render da home
    static async showToughts(req, res) {

        let search = ''
        // Caso tenha algum valor no input search(o mesmo sera enviado para a url ?search=valordigitado), o valor será atribuido a variavel acima
        if (req.query.search) {
            search = req.query.search
        }

        // Definindo a ordenação, valor inicial de forma descrescente(mais novo para mais velho)
        let order = 'DESC'

        // Validando o botão que foi enviado
        if (req.query.order === 'old') {
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        // Resgato do DB todos os toughts registrados, e incluir os dados do user
        // Resgato tambem se necessário apenas os valores que incluem o valor informado na barra de pesquisa, op.like
        // %string% vai retornar todos os valores que incluam oque foi digitado dinamicamente
        // atributo order, que recebe o valor que será considerado para ordenação, no caso a data de criação e o valor de order ('asc' ou 'desc')
        const toughtsData = await Tought.findAll({
            include: User,
            where: {
                title: {[Op.like]: `%${search}%`}
            },
            order: [[ 'createdAt', order]]
        })
        // Faço um map deste array de objs de toughts e user e uso o metodo get e atribuito plain, visto que são diversos tipos de dados que utilizaremos
        const toughts = toughtsData.map(result => result.get({plain:true}))
        
        // Receberá o numero de pensamentos dentro do array
        let toughtsQty = toughts.length

        // Reforçando que tamanho 0 igual a falso
        if (toughtsQty === 0) {
            toughtsQty = false            
        }

        res.render('toughts/home', {toughts, search, toughtsQty})
    }
    //Metodo para render da dashboard incluido os meus pensamentos
    static async dashboard(req, res){
        // Pegando o id da sessão
        
        const userId = req.session.userid

        // Atribudo include, para incluir na busca os Models atribuidos neste user
        // Plain retorna apenas o dados que nos interessam para que um each possa ser feito, parecido com o raw
        const user = await User.findOne({
            where: {
                id: userId,
            },
            include: Tought, 
            plain: true
        })

        if (!user) {
            res.redirect('/login')
        }

        //Realizamos o metodo map no obj user toughts para resgatar os dados inclusos no dataValues
        const toughts = user.Toughts.map(result => result.dataValues)

        // Caso array de toughts esteja vazio
        let emptyToughts = true
        
        // Validando array de toughts para exibir mensagem
        if(toughts.length > 0){
            emptyToughts = false 
        }
        
        res.render('toughts/dashboard', {toughts, emptyToughts})
    }
    //Metodo para render da criação de pensamento
    static createTought(req, res){
        res.render('toughts/create')
    }
    //Metodo para envio do pensamento para DB
    static async createToughtPost(req, res){
        //Usaremos o id da sessão
        const toughtData = {
            title: req.body.title,
            UserId: req.session.userid,
        }

        try {
            await Tought.create(toughtData)

            req.flash('message', 'Pensamento criado com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async removeTought(req, res){
        //Capturar o id vinda do body form type hidden
        const id = req.body.id
        //capturando o id do user vindo da sessão
        const Userid = req.session.userid


        try {
            //Metodo destroy pegando o id do body e buscando no DB e validando o Id do user tambem
            await Tought.destroy({where: {id: id, UserId: Userid}})
            
            req.flash('message', 'Pensamento apagado com sucesso!')

            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async updateTought(req, res){
        const id = req.params.id //id vindo da url

        const tought = await Tought.findOne({raw: true, where: {id: id}})

        res.render('toughts/edit', {tought})
    }

    static async updateToughtPost(req, res){
        const id = req.body.id
        const title = req.body.title
        const Userid = req.session.userid

        const toughtData = {
            id,
            title,
        }

        try {
            //Metodo update para atualizar o pensamento
            await Tought.update(toughtData, {where: {id: id, UserId: Userid}})
            
            req.flash('message', 'Pensamento atualizado com sucesso!')
    
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }
}


        
        