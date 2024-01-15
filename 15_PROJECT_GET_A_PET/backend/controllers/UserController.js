const bcrypt = require('bcrypt')

const User = require('../models/User')
const createUserToken = require('../helpers/create-user-token')
const getToken = require("../helpers/get-token")
const jwt = require('jsonwebtoken')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController{
  static async register(req, res){
    // Capturando dados via destructuring
    const {name, email, image, phone, password, confirmpassword} = req.body

    // Validation
    if(!name) return res.status(422).json({ message: 'O nome é obrigatório!'})
    if(!email) return res.status(422).json({ message: 'O email é obrigatório!'})
    if(!phone) return res.status(422).json({ message: 'Um telefone de contato é obrigatório!'})
    if(!password) return res.status(422).json({ message: 'A senha é obrigatória!'})
    if(!confirmpassword) return res.status(422).json({message: 'A confirmação de senha é obrigatória!'})
    if(confirmpassword !== password) return res.status(422).json({ message: 'Senhas não conferem!'})

    // check if user exists
    const userExists = await User.findOne({ email: email})

    if (userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
      return
    }

    // create encrypted password
    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)

    // create user
    const user = new User({
      name: name,
      email: email,
      phone: phone, 
      password: hashPassword,
    })

    try {
      const newUser = await user.save() 

      await createUserToken(newUser, req, res)
    } catch (error) {
      res.status(500).json({ message: error})
    }

    res.json({ message: 'User registrado com sucesso' })
  }

  static async login(req,res){
    const {email, password} = req.body

    if(!email) return res.status(422).json({ message: 'O email é obrigatório!'})
    if(!password) return res.status(422).json({ message: 'A senha é obrigatória!'})

    //Resgatos os dados do user atraves do e-mail
    const user = await User.findOne({ email: email})

    if (!user) {
      res.status(422).json({ message: 'Não há usuarios cadastrados com este e-mail' })
      return
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) return res.status(422).json({ message: 'Senha incorreta' })

    //Após validações ocorrerem é criado o token e retornado a autenticação
    await createUserToken(user, req, res)
  }

  //função para validação do user através do token enviado ao header do postman
  static async checkUser(req, res){
    let currentUser

    if (req.headers.authorization) {
      //Resgatamos o token enviado pela req
      const token = getToken(req)

      //Decodificamos o token utilizando o token e passando o nosso secret, assim extraindo todas as propriedades do obj criado no helper create-user-token
      const decoded = jwt.verify(token, 'oursecret')
    
      // Atribuo a variavel o usuario localizado atraves da propriedade id do obj encoded, que se refere ao id do user usado para criação deste token
      currentUser = await User.findById(decoded.id)

      // Zeramos a senha do retorno
      currentUser.password = undefined

    } else {
      currentUser = null
    }
    res.status(200).send(currentUser)
  }

  static async getUserById(req, res){
    const id = req.params.id

    //retorno o user pelo id passado pela req e com o metodo select eu removo os campos que nao desejo retorno
    try {
      const user = await User.findById(id).select('-password')
      res.status(200).json({user})
    } catch (error) {
      return res.status(422).json({ message: 'Usuário não encotrado' })
    }
  }

  static async editUser(req, res){
    const id = req.params.id

    const token = getToken(req)
    const user = await getUserByToken(token)

    const {name, email, phone, password, confirmpassword} = req.body
    // validamos se veio algum arquivo do req.file(arquivos são enviados por aqui), caso sim atribuimos o nome do arquivo enviado a variavel image
    if (req.file) {
      user.image = req.file.filename
    }

    // Validation
    if(!name) return res.status(422).json({ message: 'O nome é obrigatório!'})
    user.name = name

    if(!email) return res.status(422).json({ message: 'O email é obrigatório!'})
    const userExists = await User.findOne({email: email})
    //Check if email is already in use
    if(user.email !== email && userExists){
      return res.status(422).json({ message: 'Por favor utilize outro e-mail' })
    }
    user.email = email

    if(!phone) return res.status(422).json({ message: 'Um telefone de contato é obrigatório!'})
    user.phone = phone

    if(password !== confirmpassword) {
      res.status(422).json({ message: 'Senhas não conferem!'})
      return
    } else if (password === confirmpassword && password !== null) {
      // create password
      const salt = await bcrypt.genSalt(12)
      const hashPassword = await bcrypt.hash(password, salt)

      user.password = hashPassword
    }
    try {
      // return user updated data
      await User.findOneAndUpdate({_id: user.id},{ $set: user}, {new: true})

      res.status(200).json({ message: 'Usuário atualizado com sucesso!'})
    } catch (error) {
      res.status(500).json({ message: error})
      return
    }
  }
}