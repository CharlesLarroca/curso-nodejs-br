const fs = require('fs')

//Codigo sync
console.log('Start')

fs.writeFileSync('filesync.txt', 'Hello')

console.log('End')
