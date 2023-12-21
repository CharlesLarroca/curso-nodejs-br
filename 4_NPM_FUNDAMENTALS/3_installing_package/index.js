const _ = require('lodash') // por convenção _ é o nome dado a variavel de import do lodash, assim como $ era para o jQuery

const a = [1,2,3,4,5]
const b = [3,4,5,6,7]

const diffa = _.difference(a,b) // informa os valores a comparado a b [1,2]
console.log(diffa)

const diffb = _.difference(b,a) // informa os valores a comparado b a [6,7]
console.log(diffb)