var io = require('socket.io'),
	cookie = require('cookie'),
	cookieParser = require('cookie-parser'),
	expressSession = require('express-session'),
	ConnectRedis = require('connect-redis')(expressSession),
	redisAdapter = require('socket.io-redis'),
	redis = require('redis'),
	config = require('../config'),
	redisSession = new ConnectRedis({host: config.redisHost, port: config.redisPort}),
	redisChat = require('../redis/chat'),
	models = require('../redis/models'),
	log = require('../middleware/log');

var socketAuth = function socketAuth(socket, next){
	var handshakeData = socket.request;
	var parsedCookie = cookie.parse(handshakeData.headers.cookie);
	var sid = cookieParser.signedCookie(parsedCookie['connect.sid'], config.secret);

	if (parsedCookie['connect.sid'] === sid)
		return next(new Error('Not Authenticated'));

	redisSession.get(sid, function(err, session){
		if (session.isAuthenticated)
		{
			socket.request.user = session.passport.user;
			socket.request.sid = sid;
			redisChat.addUser(session.passport.user.id, session.passport.user.displayName, session.passport.user.provider);
			return next();
		}
		else
			return next(new Error('Not Authenticated'));
	});
};

var removeFromRoom = function removeFromRoom(socket, room){
	socket.leave(room);
	redisChat.removeUserFromRoom(socket.request.user.id, room);
	socket.broadcast.to(room).emit('RemoveUser',
		models.User(socket.request.user.id, socket.request.user.displayName, socket.request.user.provider));
};

var removeAllRooms = function removeAllRooms(socket, cb){
	var current = socket.rooms;
	var len = Object.keys(current).length;
	var i = 0;
	for(var r in current)
	{
		if (current[r] !== socket.id)
		{
			removeFromRoom(socket, current[r]);
		}
		i++;
		if (i === len) cb();

	}
};

var socketConnection = function socketConnection(socket){

	socket.on('GetMe', function(){
		socket.emit('GetMe', models.User(socket.request.user.id, socket.request.user.displayName, socket.request.user.provider));
	});

	socket.on('GetUser', function(room){
		var  usersP = redisChat.getUsersinRoom(room.room);
		usersP.done(function(users){
			socket.emit('GetUser', users);
		});
	});

	socket.on('GetChat', function(data){
		redisChat.getChat(data.room, function(chats){
			var retArray = [];
			var len = chats.length;
			chats.forEach(function(c){
				try{
					retArray.push(JSON.parse(c));
				}catch(e){
					log.error(e.message);
				}
				len--;
				if (len === 0) socket.emit('GetChat', retArray);
			});
		});
	});

	socket.on('AddChat', function(chat){
		var newChat = models.Chat(chat.message, chat.room,
			models.User(socket.request.user.id, socket.request.user.displayName, socket.request.user.provider));
		redisChat.addChat(newChat);
		socket.broadcast.to(chat.room).emit('AddChat', newChat);
		socket.emit('AddChat', newChat);
	});

	socket.on('GetRoom', function(){
		redisChat.getRooms(function(rooms){
			var retArray = [];
			var len = rooms.length;
			rooms.forEach(function(r){
				retArray.push(models.Room(r));
				len--;
				if(len === 0) socket.emit('GetRoom', retArray);
			});
		});
	});

	socket.on('AddRoom', function(r){
		var room = r.name;
		removeAllRooms(socket, function(){
			if (room !== '')
			{
				socket.join(room);
				redisChat.addRoom(room);
				socket.broadcast.emit('AddRoom', models.Room(room));
				socket.broadcast.to(room).emit('AddUser',
					models.User(socket.request.user.id, socket.request.user.displayName, socket.request.user.provider));
				redisChat.addUserToRoom(socket.request.user.id, room);
			}
		});
	});

	socket.on('disconnect', function(){
    removeAllRooms(socket, function(){});
	});
};

exports.startIo = function startIo(server){
	io = io.listen(server);

	io.adapter(redisAdapter({host: config.redisHost, port: config.redisPort}));

	var packtchat = io.of('/packtchat');

	packtchat.use(socketAuth);
	packtchat.on('connection', socketConnection);

	return io;
};

exports.io = io;
