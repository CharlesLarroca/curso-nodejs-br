const inquirer = require('inquirer')
const chalk = require('chalk')

inquirer.prompt([
  {
    name: 'q1',
    message: 'What is the first grade?',
  },
  {
    name: 'q2',
    message: 'What is the second grade?',
  },
]).then(((answers) => {
  const media = (parseInt(answers.q1) + parseInt(answers.q2)) / 2
  
  if (media >= 7) {
    console.log(`Sua média é ${media}`, chalk.green('Aprovado'))
  } else {
    console.log(`Sua média é ${media}:`, chalk.red('Reprovado'))
  }
  }
)).catch(err => console.log(err))