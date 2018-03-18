var express = require('express');
var socket = require('socket.io');
var http = require('http');

var app = express();
var server = http.createServer(app);
var io = socket.listen(server);

app.use(express.static("."));
server.listen(3333);
console.log('server running at port 3333');

app.get('/', function(request, response){
	response.sendFile(__dirname + '/templates/index.html');
});

io.sockets.on('connection', function(socket){
	console.log('Socket connection established...');

	socket.on('message_sent', function(message){
		console.log('message sent' + message);
		io.sockets.emit('new_message', {msg: message});
	});
});


