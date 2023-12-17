const minimist = require('minimist') //modulo externo, auxilia para resgatar argumentos do arquivo process.argv

const args = minimist(process.argv.slice(2)) // salva os argumentos em uma variavel

console.log(args)

//Torna o acesso a estes argumentos muito mais simples, pois é necessario passar apenas o nome da propriedade que recebeu o valor do argumento
const nome = args['nome']

console.log(nome)