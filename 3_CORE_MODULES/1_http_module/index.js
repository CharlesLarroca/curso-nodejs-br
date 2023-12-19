const http = require('http')

const port = 3001

const server = http.createServer((req, res) => {
  res.write('Hi HTTP')
  res.end()
})

server.listen(port, () => {
  console.log(`Serve running on port: ${port} http://localhost:${port}/`)
})