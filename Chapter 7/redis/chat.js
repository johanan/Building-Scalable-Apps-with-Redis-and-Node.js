var client = require('./index').client,
  q = require('q'),
  models = require('./models');

exports.addUser = function addUser(user, name, type){
  client.multi()
  .hset('user:' + user, 'name', name)
  .hset('user:' + user, 'type', type)
  .zadd('users', Date.now(), user)
  .exec();
};

exports.addRoom = function addRoom(room){
  if (room !== '') client.zadd('rooms', Date.now(), room);
};

exports.getRooms = function getRooms(cb){
  client.zrevrangebyscore('rooms', '+inf', '-inf', function(err, data){
    return cb(data);
  });
};

exports.addChat = function addChat(chat){
  client.multi()
  .zadd('rooms:' + chat.room + ':chats', Date.now(), JSON.stringify(chat))
  .zadd('users', (new Date).getTime(), chat.user.id)
  .zadd('rooms', (new Date).getTime(), chat.room)
  .exec();
};

exports.getChat = function getChat(room, cb){
  client.zrange('rooms:' + room + ':chats', 0, -1, function(err, chats){
    cb(chats);
  });
};

exports.addUserToRoom = function addUserToRoom(user, room){
  client.multi()
  .zadd('rooms:' + room, Date.now(), user)
  .zadd('users', Date.now(), user)
  .zadd('rooms', Date.now(), room)
  .set('user:' + user + ':room', room)
  .exec();
}

exports.removeUserFromRoom = function removeUserFromRoom(user, room){
  client.multi()
  .zrem('rooms:' + room, user)
  .del('user:' + user + ':room')
  .exec();
};

exports.getUsersinRoom = function getUsersinRoom(room){
  return q.Promise(function(resolve, reject, notify){
    client.zrange('rooms:' + room, 0, -1, function(err, data){
      var users = [];
      var loopsleft = data.length;
      data.forEach(function(u){
        client.hgetall('user:' + u, function(err, userHash){
          users.push(models.User(u, userHash.name, userHash.type));
          loopsleft--;
          if(loopsleft === 0) resolve(users);
        });
      });
    });
  });
};
