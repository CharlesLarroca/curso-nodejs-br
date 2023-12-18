const fs = require ('fs')

console.log('Start')

fs.writeFile('fileasync.txt', 'Hello', (err) => {
  setTimeout(() => {
    console.log('File created!')
  }, 3000)
})

console.log('End')