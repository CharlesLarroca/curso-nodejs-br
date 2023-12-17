const chalk = require('chalk')

const nota = 4

if (nota >= 7) {
  console.log(chalk.green('Aprovado'))
} else {
  console.log(chalk.bgRed.black('Reprovado'))
}