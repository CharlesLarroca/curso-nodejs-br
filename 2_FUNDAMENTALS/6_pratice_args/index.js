//Modulo Externo
const minimist = require('minimist') 

//Modulo Interno
const sum = require('./sum').sum

const args = minimist(process.argv.slice(2))

const a = parseInt(args['a'])
const b = parseInt(args['b'])

sum(a, b) // node index.js --a=1 --b=1 / 2