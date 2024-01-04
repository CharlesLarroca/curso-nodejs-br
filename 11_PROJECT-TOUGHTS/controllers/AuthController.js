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
        const createdUser = await User.create(user)

        // Ao cadastrar o user ja será logado, para isso iniciaremos a sessão e salvaremos e com isso os links da navbar ficaram dinamicos
        req.session.userid = createdUser.id // atribui ao session.userid o id de criação do user, fazendo com que a condição no app seja true, assim fazendo que uma sessão seja criada e salva

        req.flash('message', 'Cadastro Realizado com sucesso!')

        // Salvamos a sessão antes do redirecionamento
        req.session.save(() => {
          res.redirect('/') // Apareceu apenas após salvar a sessão, anteriormente aparecia ao clicar em outro link
        })        
      } catch (error) {
        console.log(error)
      }
      
    }
    // Metodo para destruir a sessão do user
    static logout(req, res){
      // Metodo destroy apaga a sessão
      req.session.destroy()
      res.redirect('/login')
    }

    // Metodo para realizar login
    static async loginPost(req, res){
      // Capturando dos enviados pelo body via desctructring
      const {email, password} = req.body
      
      // Validação se email(user) existe
      const user = await User.findOne({where: {email: email}})
      if(!user){
        req.flash('message', 'Usuário não encontrado!')
        res.render('auth/login')

        return
      }

      // Validação de senha
      const matchPassword = bcrypt.compareSync(password, user.senha)
      if(!matchPassword){
        req.flash('message', 'Senha inválida!')
        res.render('auth/login')

        return
      }
      req.session.userid = user.id

      req.flash('message', 'Login realizado com sucesso!')
       
      req.session.save(()=> {
        res.redirect('/')
    })
  }
}