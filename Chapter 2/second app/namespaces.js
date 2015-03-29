var io = require('socket.io').listen(4000);

io.sockets.on('connection', function(socket){
	socket.on('join', function(data){
		socket.username = data.username;
		socket.broadcast.emit('join', {username: data.username, socket: socket.id});
	});

	socket.on('ping', function(){
		socket.broadcast.emit('ping', {username: socket.username});
	});

	socket.on('privatePing', function(data){
		io.sockets.connected[data.socket].emit('ping', {username: socket.username, priv: true});
	});
});

io.of('/vip').on('connection', function(socket){
	socket.on('join', function(data){
		socket.username = data.username;
		socket.broadcast.emit('join', {username: data.username, socket: socket.id});
	});

	socket.on('ping', function(){
		socket.broadcast.emit('ping', {username: socket.username});
	});

	socket.on('privatePing', function(data){
		io.of('/vip').connected[data.socket].emit('ping', {username: socket.username, priv: true});
	});
});
