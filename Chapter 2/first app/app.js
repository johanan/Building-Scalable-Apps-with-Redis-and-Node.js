var io = require('socket.io').listen(4000);

io.sockets.on('connection', function(socket){
	socket.on('join', function(data){
		socket.broadcast.emit('userJoined', data);
		socket.username = data.username;
	});

	socket.on('ping', function(data, done){
		socket.broadcast.emit('ping', {username: socket.username});
		done('ack');
	});

	socket.on('disconnect', function(){
		socket.broadcast.emit('userDisconnect', {username: socket.username});
	});
});
