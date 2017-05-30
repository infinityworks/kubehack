const express = require('express')
const app = express()

app.get('/version', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ version: '1.0.0' }));
})

app.get('/', function (req, res) {
  res.send('<h1>Hey hackers!</h1>');
})

app.listen(80, function () {
  console.log('Example app listening on port 80!')
})
