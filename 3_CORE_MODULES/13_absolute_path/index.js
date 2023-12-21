const path = require('path')

//path absoluto
console.log(path.resolve('test.txt')) // c:\Users\clarroca\Desktop\Programação\curso-nodejs-br\3_CORE_MODULES\13_absolute_path\test.txt

//formar path
const foldername = 'relatorios'
const filename = 'dezembro.xls'

const finalPath = path.join('/', 'desktop', foldername, filename)
console.log(finalPath) // \desktop\relatorios\dezembro.xls
