const chalk = require('chalk')
const inquirer = require('inquirer')

inquirer.prompt([
  {
    name: 'name',
    message: "Whats's your name?"
  },
  {
    name: 'age',
    message: 'How old are you?'
  }
])
  .then(answers => {
    if(!answers.name || !answers.age){
      throw new Error (`Error: Name e age must exists.`)
    }
    console.log('Your name is ' + chalk.bgYellow.black(answers.name) + " and you're " + chalk.bgYellow.black(answers.age) + ' years old.')
    
  })
  .catch(err => console.log(err))