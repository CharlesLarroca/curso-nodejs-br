// vamos passar um nome como argumento

console.log(process.argv)

//Array onde ficamo armazenadas as infos
/*
[
  'C:\\Program Files\\nodejs\\node.exe', // arquivo executavel do node
  'C:\\Users\\clarroca\\Desktop\\Programação\\curso-nodejs-br\\2_FUNDAMENTALS\\4_read_args\\index.js', // arquivo que esta sendo executado
  'nome=Charles' // argumento
]
*/
//Pego o argumento que passei na linha de comando
const args = process.argv.slice(2)
console.log(args)

//divido em um novo array e pego o valor desejado em forma de string
const name = args[0].split('=')[1]
console.log(name)

const age = args[1].split('=')[1]
console.log(age)

console.log(`Hello my name is ${name} and i'm ${age} years old.`)