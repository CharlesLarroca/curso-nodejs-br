const express = require('express')
const router = express.Router()
const path = require('path')

const basePath = path.join(__dirname, '../templates')

router.get('/secondpage', (req, res) => {
  res.sendFile(`${basePath}/secondpage.html`)
})
router.get('/', (req, res) => {
  res.sendFile(`${basePath}/home.html`)
})

module.exports = router