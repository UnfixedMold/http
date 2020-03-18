const express = require('express')
const app = express()
const { port } = require('./helpers')
 
app.get('/', (req, res) => {
  res.send('Hello World')
})
 
app.listen(port)