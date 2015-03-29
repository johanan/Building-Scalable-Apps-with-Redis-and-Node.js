var express = require('express'),
  io = require('socket.io'),
  redis = require('redis');

var app = express(),
  redisClient = redis.createClient();

app.use(express.static(__dirname + '/static'));

var server = app.listen(8004);

//setup pub/sub
redisClient.subscribe('testpubsub');

io = io.listen(server);

io.on('connection', function(socket){
  redisClient.on('message', function(channel, message){
    socket.emit('pubsub', {channel: channel, message: message});
  });

});
