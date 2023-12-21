const fs = require(`fs`)
const http = require('http')
const url = require('url')

const port = 3000

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true)
  const filename = query.pathname.substring(1) // a partir da abstração de infos que o url.parse tem é atibuido a variavel o nome da pagina após a barra (em substring se fosse o 0, pegaria o nome a partir da barra)

  if(filename.includes('html')){
    if (fs.existsSync(filename)) {
      fs.readFile(filename, (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(data)
        return res.end()
      })
    } else {
      fs.readFile('404.html', (err, data) => {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.write(data)
        return res.end()
      })
    }
  } 
})

server.listen(port, () => {
  console.log(`Serve running on: http://localhost:${port}`)
})  