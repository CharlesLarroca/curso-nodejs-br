const jwt = require('jsonwebtoken')

// Middleware para criação de token do user
const createUserToken = async(user, req, res) => {
  // create token
  // metodo sig que recebe como parametros os dados que serão validados e o token de validação
  const token = jwt.sign({
    name: user.name,
    id: user._id,
  }, 'oursecret')

  // return token para visualização no front end
  res.status(200).json({
    message: 'Você está autenticado', 
    token: token, 
    userId: user._id
  })
}

module.exports = createUserToken