const http = require('http')

const port = 3001

const server = http.createServer((req, res) => {
  res.statusCode = 200 //informa que a requisição ocorreu com sucesso
  res.setHeader('Content-Type', 'text/html') // alterando o tipo de conteudo que será apresentado, no caso para html
  res.end('<h1>Hello, thats my first HTTP server com HTML!</h1>')
})

server.listen(port, () => {
  console.log(`Serve running on port: ${port} http://localhost:${port}/`)
})