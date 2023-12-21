const fs = require(`fs`)
const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
  const urlInfo = require('url').parse(req.url, true)
  const name = urlInfo.query.name

  if(!name){
    fs.readFile('index.html', (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.write(data)
      return res.end()
    })
  } else {
    fs.writeFile('file.txt', name, (err, data) => {
      res.writeHead(302, {
        Location: '/',
      }) 
      // após o arquivo ser criado e inserido o nome, o user sera redirecionado atraves do codigo 302(redirect, para a pagina desejada no caso a do formulario )
      return res.end()
    })
  }
})

server.listen(port, () => {
  console.log(`Serve running on: http://localhost:${port}`)
})  