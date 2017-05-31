const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/version', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ version: '2.0.0' }));
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
})

var io = require('socket.io').listen(app.listen(80));

io.sockets.on('connection', function(socket) {
  socket.emit('message', { message: 'Welcome to kubechat' });
  socket.on('send', function(data) {
    io.sockets.emit('message', data);
  });
});
