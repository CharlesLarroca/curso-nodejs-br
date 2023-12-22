//External Module
const inquirer = require('inquirer')
const chalk = require('chalk')

//Internal Module
const fs = require('fs')

console.log('Starting the Accounts')

operations() //Inicio a função ao iniciar a aplicação

function operations() {
  inquirer.prompt([
    {
      type: 'list', // formato que opções serão apresentadas
      name: 'action', // nome da propriedade que as opções poderão ser acessadas
      message: 'What you wanna do?',
      choices: [ // opções a serem apresentadas
        'Create Account',
        'Check balance',
        'Deposit',
        'Withdraw',
        'Transfer',
        'Leave'
      ]
    }
  ])
  .then(answer => {
    const action = answer['action'] // atribuo a variavel a choice escolhida pelo user

    if(action === 'Create Account') createAccount()
    if(action === 'Check balance') checkBalance()
    if(action === 'Deposit') deposit()
    if(action === 'Withdraw') withdraw()
    if(action === 'Transfer') transferMoney() // A FAZER
    if(action === 'Leave'){
      console.log(chalk.bgBlue.black('Thanks for using Accounts!'))
      process.exit() // Encerra a execução da aplicação
    }
  })
  .catch(err => console.log(err))
}

//Create Account
function createAccount(){
  console.log(chalk.bgGreen.black('Welcome to Accounts!'))
  console.log(chalk.green('Define the option of your account.'))
  buildAccount()
}

function buildAccount(){
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Type a name to your account:',
    }
  ])
  .then(answer => {
    const accountName = answer['accountName']
    console.info(accountName)
    //Valida e cria se necessário o diretorio onde as contas serão armazenadas
    if (!fs.existsSync('accounts')) {
      fs.mkdirSync('accounts')
    }

    //Valida se a conta ja existe dentro do diretorio
    if (fs.existsSync(`accounts/${accountName}.json`)) {
      console.log(
        chalk.bgRed.black('This account already exists, please chose another name.')
      )
      buildAccount()
      return
    }
    //Caso nao exista crio a conta(arquivo), dentro do do diretorio com arquivo sendo em formato JSON, nome do arquivo, conteudo do arquivo, uma callback de erro
    fs.writeFileSync(`accounts/${accountName}.json`, 
    '{"Balance": 0}',
    function(err) { console.log(err) }
    )
    console.log(chalk.green('Congratulation, you account is created!')) 
    operations() // retorno para o menu de opções
  })
  .catch(err => console.log(err))
}

// Add an amount to user account
function deposit(){
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'What is the accounts name?'
    }
  ])
  .then(answer => {
    const accountName = answer['accountName']

    //Valida se a conta existe
    if (!checkAccount(accountName)) {
      return deposit() // retorna para primeira parte deste bloco de codigo, no caso confirmação do nome da conta
    }

    inquirer.prompt([
      {
        name: 'amount',
        message: 'How much you want to deposit?'
      }
    ])
    .then(answer => {
      const amount = answer['amount']
      //add amount
      addAmount(accountName, amount) // chama função de add valor dentro do arquivo json
    })
    .catch(err => console.log(err))

  })
  .catch(err => console.log(err))
}

function checkAccount(accountName){
  //Valida se conta existe dentro do diretorio criado no inicio para armazenar contas
  if (!fs.existsSync(`accounts/${accountName}.json`)){
    console.log(chalk.bgRed.black('This account dont exists, try another account name!'))
    return false
  }
  return true
}

function addAmount(accountName, amount){
  const accountData = getAccount(accountName) // atribui a variave a conta desejada ja convertida de string para json
  if (!amount) {
    console.log(chalk.bgRed.black('Something is wrong, try again later!'))
    return deposit() // caso valor nao seja inserido retorna para o inicio do bloco da func de deposit, neste caso confirmação de conta
  }
  // Acessa a key balance da conta informada e adiciona ou valor existente o valor digitado
  accountData.Balance = parseFloat(amount) + parseFloat(accountData.Balance)
  //escreve novamente o arquivo e ja converte de json para string novamente
  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData), 
    function (err) {
      console.log(err)
    }
  )
  console.log(chalk.green(`The amount of R$ ${amount}, is now in your account.`))
  console.log(chalk.bgBlue.black(`Your account balance is now R$ ${accountData.Balance}.`))
  operations() // retorna para o menu de operações
}

function getAccount(accountName){
  // le o aquivo baseado na conta informada com o encoding no padrão br e com a flag de somente leitura
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf8',
    flag: 'r' // read only
  })

  return JSON.parse(accountJSON) // retorna os dados em formato json
}

// Show account balance
function checkBalance(){
  inquirer.prompt([
    {
      name:'accountName',
      message: 'What is the accounts name?'
    }
  ])
  .then(answer => {
    const accountName = answer['accountName']

    if (!checkAccount) {
      return checkBalance()
    }

    const accountData = getAccount(accountName)

    console.log(chalk.bgBlue.black(`Your account balance is R$ ${accountData.Balance}`))
    operations()
  })
  .catch(err => console.log(err))
}

//Withdraw

function withdraw(){
  inquirer.prompt([
    {
      name:'accountName',
      message: 'What is the accounts name?'
    }
  ])
  .then(answer => {
    const accountName = answer['accountName']

    if (!checkAccount(accountName)) {
      return withdraw()
    }

    inquirer.prompt([
      {
        name: 'amount',
        message: 'How much you want withdraw?'
      }
    ])
    .then(answer => {
      const amount = answer['amount']
      withdrawAmount(accountName, amount)
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
}

function withdrawAmount(accountName, amount){
  const accountData = getAccount(accountName)
  if (!amount) {
    console.log(chalk.bgRed.black('Something is wrong, try again later!'))
    return withdraw()
  }

  if (accountData.Balance < amount) {
    console.log(chalk.bgRed.black('Insuficient balance to withdraw, try again later!'))
    return withdraw()
  }
  accountData.Balance = parseFloat(accountData.Balance) - parseFloat(amount)
  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData), 
    function (err) {
      console.log(err)
    }
  )
  console.log(chalk.green(`Success, you withdraw R$ ${amount} of your account!`))
  console.log(chalk.bgBlue.black(`Your account balance is now R$ ${accountData.Balance}.`))

  operations()
}

function transferMoney() {
  inquirer.prompt([
    {
      name:'accountName',
      message: 'What is the accounts name?'
    }
  ])
  .then(answer => {
    const accountName = answer['accountName']

    if (!checkAccount(accountName)) {
      return transferMoney()
    }

    inquirer.prompt([
      {
        name: 'accountNameDestiny',
        message: 'What is the account destiny?'
      }
    ])
    .then(answer => {
      const accountNameDestiny = answer['accountNameDestiny']
      if (!checkAccount(accountNameDestiny)) {
        return transferMoney()
      }
      //If para validar se a conta destino é a mesma da conta inicial
      if (accountNameDestiny === accountName) {
        console.log(chalk.bgRed.black('A conta destino não pode ser igual a conta origem'))
        return transferMoney()
      }

      inquirer.prompt([
        {
          name: 'amountDestiny',
          message: 'What is the amount you want to transfer?'
        }
      ])
      .then(answer => {
        const amountDestiny = answer['amountDestiny']
        transferMoneyDestiny(accountName, accountNameDestiny, amountDestiny)
      }
      )
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
}

function transferMoneyDestiny(accountName, accountNameDestiny, amountDestiny){
  const accountNameData = getAccount(accountName)
  const accountNameDestinyData = getAccount(accountNameDestiny)
  if (!amountDestiny) {
    console.log(chalk.bgRed.black('Something is wrong, try again later!'))
    return transferMoney()
  }

  if (accountNameData.Balance < amountDestiny) {
    console.log(chalk.bgRed.black('Insuficient balance to transfer, try again later!'))
    return transferMoney()
  }

  accountNameData.Balance = parseFloat(accountNameData.Balance) - parseFloat(amountDestiny)
  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountNameData), 
    function (err) {
      console.log(err)
    }
  )
  accountNameDestinyData.Balance = parseFloat(amountDestiny) + parseFloat(accountNameDestinyData.Balance)
  fs.writeFileSync(
    `accounts/${accountNameDestiny}.json`,
    JSON.stringify(accountNameDestinyData), 
    function (err) {
      console.log(err)
    }
  )
  console.log(chalk.green(`Success, you transfer R$ ${amountDestiny} from your account to the ${accountNameDestiny} account!`))
  console.log(chalk.bgBlue.black(`Your account balance is now R$ ${accountNameData.Balance}.`))
  operations()
}