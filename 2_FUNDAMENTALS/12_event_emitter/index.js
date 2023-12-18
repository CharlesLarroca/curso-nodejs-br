const EventEmitter = require('events') // importando o modulo em uma variavel do tipo class
const eventEmitter = new EventEmitter() // instanciando a classe em uma variavel 

eventEmitter.on('start', () => { 
  console.log('During')
})

console.log('Before')

eventEmitter.emit('start')

console.log('After')