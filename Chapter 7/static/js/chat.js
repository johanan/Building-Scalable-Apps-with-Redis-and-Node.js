var PacktChat = window.PacktChat || {};
PacktChat.Chat = function(el){
  var $root = $('#' + el),
  socket = io.connect("http://localhost:3000/packtchat"),
  me = null,
  connected = false;
  //to be initialized
  var router,
    roomsCollection,
    userCollection,
    chatCollection;

  var GetMe = function GetMe(user){
    me = new User(user);
    Backbone.history.stop();
    startChat(me);
    Backbone.history.start();
    connected = true;
  };

  socket.on('connect', function(){
    if (!connected) socket.emit('GetMe');
  });
  socket.on('GetMe', GetMe);

  var startChat = function startThis(){
    router = new Router();

    Backbone.socket = socket;
    Backbone.sync = SocketSync;

    roomsCollection = new RoomsCollection();
    roomsCollection.noun = 'Room';
    userCollection = new UserCollection();
    userCollection.noun = 'User';
    chatCollection = new ChatCollection();
    chatCollection.noun = 'Chat';

    var roomsSync = new SocketListener('Room', roomsCollection, socket);
    var userSync = new SocketListener('User', userCollection, socket);
    var chatSync = new SocketListener('Chat', chatCollection, socket);

    roomsCollection.fetch();

    var channel = postal.channel();
    var roomJoin = channel.subscribe('Room.Join', roomFormEvent);

    function roomFormEvent(message){
      roomsCollection.add({name: message.roomName, id: message.roomName});
      router.navigate('room/' + message.roomName, {trigger: true});
    };

    function RoomSelection(){
      roomsCollection.sync('create', {name: 'lobby', id: 'lobby'});
      React.unmountComponentAtNode($root[0]);
      React.renderComponent(RoomForm({rooms: roomsCollection}), $root[0]);
    }

    function JoinRoom(room){
      userCollection.reset();
      chatCollection.reset();
      roomsCollection.sync('create', {name: room, id: room});
      chatCollection.fetch({room: room});
      userCollection.fetch({room: room});
      React.unmountComponentAtNode($root[0]);
      React.renderComponent(ChatView({users: userCollection, chats: chatCollection, room: room, me: me}), $root[0]);
    };

    function DefaultRoute(){
      router.navigate('', {trigger: true});
    };

    router.on('route:RoomSelection', RoomSelection);
    router.on('route:JoinRoom', JoinRoom);
    router.on('route:Default', DefaultRoute);
  };
};

var pc = new PacktChat.Chat('react-root');
