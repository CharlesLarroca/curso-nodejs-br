const fs = require('fs') // importando o file system

//readFile faz a leitura de arquivos externos do arquivo, recebe 1º parametro como o caminho do arquivo, o 2º é o encoding(para que leitura seja apresentada como foi escrita, com pontuação acentuação e etc, e uma func(neste caso uma =>) na qual apresentará o arquivo ou um erro)
fs.readFile('file.txt', 'utf8', (err, data) => {
  if(err){
    console.log(err)
    return
  }
  console.log(data) // I'm Here.
})

fs.readFile('file1.txt', 'utf8', (err, data) => {
  if(err){
    console.log(err) // erro
    return
  }
  console.log(data)
})