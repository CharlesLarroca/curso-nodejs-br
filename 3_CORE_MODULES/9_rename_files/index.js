const fs = require('fs')

fs.rename('file.txt', 'newfile.txt',  (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log('File renamed!')
})