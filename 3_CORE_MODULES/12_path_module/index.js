const path = require('path')

const pathCustom = '/download/rom/zelda.gba'

console.log(path.dirname(pathCustom)) // /download/rom
console.log(path.basename(pathCustom)) // zelda.gba
console.log(path.extname(pathCustom)) // .gba