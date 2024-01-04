// Middleware para validar se user está logado para acessar paginas especificas
module.exports.checkAuth = (req, res, next) => {
  // Atribuo a variavel o id da sessão caso exista
  const userId = req.session.userid

  // Valido se existe sessão ativa, se nao exitir redirect para pag login
  if (!userId) {
    res.redirect('/login')
  }
// se existir segue para pag desejada
  next()
}