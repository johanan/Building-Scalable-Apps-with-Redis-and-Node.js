var io = require('socket.io').listen(4000);


io.sockets.on('connection', function(socket){
	socket.emit('message', {from: 'default'});
	socket.join('vip');
	socket.to('vip').emit('message', {from: 'vip room'});
});

io.of('/vip').on('connection', function(socket){
	socket.emit('message', {from: 'vip'});
});