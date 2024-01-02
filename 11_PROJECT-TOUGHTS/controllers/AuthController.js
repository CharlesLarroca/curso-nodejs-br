const User = require('../models/User') // Importar Model para comunicação
const bcrypt = require('bcryptjs') // Importar bcrypt para criptografia da senha

module.exports = class AuthController{
    //Metodo para render da pagina de login
    static login(req, res) {
        res.render('auth/login')
    }

    //Metodo para render da pagina de cadastro
    static register(req, res) {
      res.render('auth/register')
    }

    //Metodo para criação dos dados de user no DB
    static async registerPost(req, res){
      //Metodo de descontructor para capturar dados vindos do body
      const {name, email, password, confirmpassword} = req.body
      
      // Password igual confirmpassword
      if(password != confirmpassword){
        //Enviar mensagem via flash message
        //Paramentros de propriedade para ser acessada no front do obj messages e conteudo da mensagem
        req.flash('message', 'As senhas não conferem, tente novamente')
        res.render('auth/register') // inseridas via if no layout

        return
      }

      // Valida se user ja existe atraves do email
      //Metodo findOne no DB
      const checkIfUserExists = await User.findOne({where: {email: email}})
      if(checkIfUserExists){
        req.flash('message', 'o e-mail já está em uso!')
        res.render('auth/register')

        return
      }

      // Criar password usando o bcrypt, para que passaword vá codificado para o db
      const salt = bcrypt.genSaltSync(10)// tamanho que o hash da senha terá no caso 10 caracteres
      // Metodo hashSync para codificação da senha, 1º paramentro a senha vinda do body e o 2º o salt
      const hashedPassword = bcrypt.hashSync(password, salt)

      const user = {
        nome: name,
        email,
        senha: hashedPassword
      }

      // Metodo para enviar dados ao DB
      try {
        await User.create(user)
        req.flash('message', 'Cadastro Realizado com sucesso!')
        res.redirect('/')
      } catch (error) {
        console.log(err)
      }
      
    }
}