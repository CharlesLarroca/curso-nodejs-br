//Unindo http e url, criando um server com o http e alterar a resposta com base na url acessada

const http = require('http')
const url = require('url')

const port = 3000

const server = http.createServer((req, res) => {

  const urlInfo = url.parse(req.url, true) // abstraindo as infos da url enviada
  const name = urlInfo.query.name // atribuindo a variavel o nome abstraido da url

  res.statusCode = 200 
  res.setHeader('Content-Type', 'text/html') 

  if (!name) { // caso na url nao contenha a chave paramentro nome
    res.end(`
    <h1>Preencha seu nome:</h1>
    <form method="GET">
      <input type="text" name="name">
      <input type="submit" value="Enviar">
    </form>
    `)
  } else { // caso na url contenha a chave paramentro nome
    res.end(`<h1>Seja bem-vindo ${name}!</h1>`)
  }

})

server.listen(port, () => {
  console.log(`Serve running on: http://localhost:${port}`)
})  