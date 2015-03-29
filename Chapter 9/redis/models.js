var User = function User(id, name, type){
  if(arguments.length < 3 ) Throw('Not enough args!');
  return {id: id, user: name, type: type};
};

var Chat = function Chat(message, room, user){
  if(arguments.length < 3 ) Throw('Not enough args!');
  if(typeof user !== 'object') Throw('User must be an object!');
  return {id: user.id + (new Date).getTime().toString(),
  message: message, room: room, ts: (new Date).getTime(), user: user};
};

var Room = function Room(name){
  if(arguments.length < 1) Throw('Room needs a name!');
  return {id: name, name: name};
}

exports.User = User;
exports.Chat = Chat;
exports.Room = Room;
