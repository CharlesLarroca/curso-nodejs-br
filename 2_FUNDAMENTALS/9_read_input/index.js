const chalk = require('chalk')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question('What is your favorite language? ', (language) => {
  console.log('My favorite language is ' + chalk.green(language))
  readline.close()
})
