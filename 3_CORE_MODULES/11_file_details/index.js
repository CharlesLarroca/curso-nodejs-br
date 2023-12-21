const fs = require('fs')

fs.stat('file.txt', (err, stats) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(stats.isFile()) // true
  console.log(stats.isDirectory()) // false
  console.log(stats.isSymbolicLink()) // false
  console.log(stats.ctime) // 2023-12-21T05:31:41.614Z
  console.log(stats.size) // 7
})