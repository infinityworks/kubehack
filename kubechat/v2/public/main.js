window.onload = function() {
  var messages = [];

  // Works on my machine.
  var socket = io.connect('http://localhost');

  var field = document.getElementById('field');
  var sendButton = document.getElementById('send');
  var content = document.getElementById('content');
  var name = document.getElementById('name');

  socket.on('message', function(data) {
    if (data.message) {
      messages.push(data.message);

      var html = '';
      for (var i = 0; i < messages.length; i++) {
        var msg = messages[i];

        html += '<b>' + (msg.username ? msg.username : 'Server') + '</b>';
        html += msg.body + '<br/>';
      }

      content.innerHTML = html
    } else {
      console.log('Oops. Something went wrong: ', data);
    }
  });

  sendButton.onclick = function() {
    if (!name.value) {
      alert('Please enter your name');
    } else {
      socket.emit('send', { username: name.value, body: field.value });
    }
  }
}
