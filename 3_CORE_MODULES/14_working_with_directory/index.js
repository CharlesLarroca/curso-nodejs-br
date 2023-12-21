const fs = require('fs')

if(!fs.existsSync('./myfolder')){
  console.log('Nop')
  fs.mkdirSync('myfolder')
} else if (fs.existsSync('./myfolder')){
  console.log('Yes')
}