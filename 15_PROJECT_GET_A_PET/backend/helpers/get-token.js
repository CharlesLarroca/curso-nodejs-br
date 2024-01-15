const getToken = req => {
  //Resgato o token cadastrado no headers do postman
  const authHeader = req.headers.authorization
  // Extraio somente o conteudo da string após um espaço, separando em um array de 2 elementos e seleciono o index 1
  const token = authHeader.split(" ")[1]
  return token
}

module.exports = getToken