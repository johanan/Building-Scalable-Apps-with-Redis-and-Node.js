function md5cycle(x, k) {
var a = x[0], b = x[1], c = x[2], d = x[3];

a = ff(a, b, c, d, k[0], 7, -680876936);
d = ff(d, a, b, c, k[1], 12, -389564586);
c = ff(c, d, a, b, k[2], 17,  606105819);
b = ff(b, c, d, a, k[3], 22, -1044525330);
a = ff(a, b, c, d, k[4], 7, -176418897);
d = ff(d, a, b, c, k[5], 12,  1200080426);
c = ff(c, d, a, b, k[6], 17, -1473231341);
b = ff(b, c, d, a, k[7], 22, -45705983);
a = ff(a, b, c, d, k[8], 7,  1770035416);
d = ff(d, a, b, c, k[9], 12, -1958414417);
c = ff(c, d, a, b, k[10], 17, -42063);
b = ff(b, c, d, a, k[11], 22, -1990404162);
a = ff(a, b, c, d, k[12], 7,  1804603682);
d = ff(d, a, b, c, k[13], 12, -40341101);
c = ff(c, d, a, b, k[14], 17, -1502002290);
b = ff(b, c, d, a, k[15], 22,  1236535329);

a = gg(a, b, c, d, k[1], 5, -165796510);
d = gg(d, a, b, c, k[6], 9, -1069501632);
c = gg(c, d, a, b, k[11], 14,  643717713);
b = gg(b, c, d, a, k[0], 20, -373897302);
a = gg(a, b, c, d, k[5], 5, -701558691);
d = gg(d, a, b, c, k[10], 9,  38016083);
c = gg(c, d, a, b, k[15], 14, -660478335);
b = gg(b, c, d, a, k[4], 20, -405537848);
a = gg(a, b, c, d, k[9], 5,  568446438);
d = gg(d, a, b, c, k[14], 9, -1019803690);
c = gg(c, d, a, b, k[3], 14, -187363961);
b = gg(b, c, d, a, k[8], 20,  1163531501);
a = gg(a, b, c, d, k[13], 5, -1444681467);
d = gg(d, a, b, c, k[2], 9, -51403784);
c = gg(c, d, a, b, k[7], 14,  1735328473);
b = gg(b, c, d, a, k[12], 20, -1926607734);

a = hh(a, b, c, d, k[5], 4, -378558);
d = hh(d, a, b, c, k[8], 11, -2022574463);
c = hh(c, d, a, b, k[11], 16,  1839030562);
b = hh(b, c, d, a, k[14], 23, -35309556);
a = hh(a, b, c, d, k[1], 4, -1530992060);
d = hh(d, a, b, c, k[4], 11,  1272893353);
c = hh(c, d, a, b, k[7], 16, -155497632);
b = hh(b, c, d, a, k[10], 23, -1094730640);
a = hh(a, b, c, d, k[13], 4,  681279174);
d = hh(d, a, b, c, k[0], 11, -358537222);
c = hh(c, d, a, b, k[3], 16, -722521979);
b = hh(b, c, d, a, k[6], 23,  76029189);
a = hh(a, b, c, d, k[9], 4, -640364487);
d = hh(d, a, b, c, k[12], 11, -421815835);
c = hh(c, d, a, b, k[15], 16,  530742520);
b = hh(b, c, d, a, k[2], 23, -995338651);

a = ii(a, b, c, d, k[0], 6, -198630844);
d = ii(d, a, b, c, k[7], 10,  1126891415);
c = ii(c, d, a, b, k[14], 15, -1416354905);
b = ii(b, c, d, a, k[5], 21, -57434055);
a = ii(a, b, c, d, k[12], 6,  1700485571);
d = ii(d, a, b, c, k[3], 10, -1894986606);
c = ii(c, d, a, b, k[10], 15, -1051523);
b = ii(b, c, d, a, k[1], 21, -2054922799);
a = ii(a, b, c, d, k[8], 6,  1873313359);
d = ii(d, a, b, c, k[15], 10, -30611744);
c = ii(c, d, a, b, k[6], 15, -1560198380);
b = ii(b, c, d, a, k[13], 21,  1309151649);
a = ii(a, b, c, d, k[4], 6, -145523070);
d = ii(d, a, b, c, k[11], 10, -1120210379);
c = ii(c, d, a, b, k[2], 15,  718787259);
b = ii(b, c, d, a, k[9], 21, -343485551);

x[0] = add32(a, x[0]);
x[1] = add32(b, x[1]);
x[2] = add32(c, x[2]);
x[3] = add32(d, x[3]);

}

function cmn(q, a, b, x, s, t) {
a = add32(add32(a, q), add32(x, t));
return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(a, b, c, d, x, s, t) {
return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function md51(s) {
txt = '';
var n = s.length,
state = [1732584193, -271733879, -1732584194, 271733878], i;
for (i=64; i<=s.length; i+=64) {
md5cycle(state, md5blk(s.substring(i-64, i)));
}
s = s.substring(i-64);
var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
for (i=0; i<s.length; i++)
tail[i>>2] |= s.charCodeAt(i) << ((i%4) << 3);
tail[i>>2] |= 0x80 << ((i%4) << 3);
if (i > 55) {
md5cycle(state, tail);
for (i=0; i<16; i++) tail[i] = 0;
}
tail[14] = n*8;
md5cycle(state, tail);
return state;
}

/* there needs to be support for Unicode here,
 * unless we pretend that we can redefine the MD-5
 * algorithm for multi-byte characters (perhaps
 * by adding every four 16-bit characters and
 * shortening the sum to 32 bits). Otherwise
 * I suggest performing MD-5 as if every character
 * was two bytes--e.g., 0040 0025 = @%--but then
 * how will an ordinary MD-5 sum be matched?
 * There is no way to standardize text to something
 * like UTF-8 before transformation; speed cost is
 * utterly prohibitive. The JavaScript standard
 * itself needs to look at this: it should start
 * providing access to strings as preformed UTF-8
 * 8-bit unsigned value arrays.
 */
function md5blk(s) { /* I figured global was faster.   */
var md5blks = [], i; /* Andy King said do it this way. */
for (i=0; i<64; i+=4) {
md5blks[i>>2] = s.charCodeAt(i)
+ (s.charCodeAt(i+1) << 8)
+ (s.charCodeAt(i+2) << 16)
+ (s.charCodeAt(i+3) << 24);
}
return md5blks;
}

var hex_chr = '0123456789abcdef'.split('');

function rhex(n)
{
var s='', j=0;
for(; j<4; j++)
s += hex_chr[(n >> (j * 8 + 4)) & 0x0F]
+ hex_chr[(n >> (j * 8)) & 0x0F];
return s;
}

function hex(x) {
for (var i=0; i<x.length; i++)
x[i] = rhex(x[i]);
return x.join('');
}

function md5(s) {
return hex(md51(s));
}

/* this function is much faster,
so if possible we use it. Some IEs
are the only ones I know of that
need the idiotic second function,
generated by an if clause.  */

function add32(a, b) {
return (a + b) & 0xFFFFFFFF;
}

if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
function add32(x, y) {
var lsw = (x & 0xFFFF) + (y & 0xFFFF),
msw = (x >> 16) + (y >> 16) + (lsw >> 16);
return (msw << 16) | (lsw & 0xFFFF);
}
}

var RoomForm = React.createClass({
  componentWillMount: function(){
    this.channel = postal.channel();
    this._boundForceUpdate = this.forceUpdate.bind(this, null);
    this.props.rooms.on('add change remove', this._boundForceUpdate, this);
  },
  componentWillUnmount: function() {
      this.props.rooms.off("add change remove", this._boundForceUpdate);
    },
  joinRoomHandler: function(){
    this.channel.publish('Room.Join', {roomName: this.refs.roomName.getDOMNode().value});
  },
  render: function(){
    return React.DOM.div({className: 'col-sm-8 col-sm-offset-2'},
      React.DOM.h2(null, 'Please Select a Room'),
      React.DOM.input({type: 'text', placeholder: 'Room Name', className: 'form-control', ref: 'roomName'}, null),
      React.DOM.button({className: 'btn btn-primary btn-block top-margin', onClick: this.joinRoomHandler}, 'Join Room'),
      React.DOM.ul(null,
        this.props.rooms.map(function(r){
          return React.DOM.li({className: 'list-unstyled'}, React.DOM.a({href: '#room/' + r.get('name')}, r.get('name'))
          );
        })
      )
    );
  }
});

var ChatView = React.createClass({
  componentWillMount: function(){
    var channel = postal.channel();
    this._boundForceUpdate = this.forceUpdate.bind(this, null);
    this.props.chats.on('add change remove', this._boundForceUpdate, this);
    this.props.users.on('add change remove', this._boundForceUpdate, this);
    this.chatSub = channel.subscribe('Chat.Add', this.chatAdd);
  },
  componentWillUnmount: function() {
    this.props.chats.off("add change remove", this._boundForceUpdate);
    this.props.users.off("add change remove", this._boundForceUpdate);
    this.chatSub.unsubscribe();
  },
  componentDidUpdate: function(){
    var chatList = this.refs.chatList.getDOMNode();
    chatList.scrollTop = chatList.scrollHeight;
  },
  chatAdd: function(data){
    this.props.chats.sync('create', {message: data.message, room: this.props.room});
  },
  render: function(){
    return React.DOM.div({className: "row"},
      React.DOM.div({className: 'row'},
        React.DOM.div({className: "col-sm-2"}, UserList({collection: this.props.users, me: this.props.me}) ),
        React.DOM.div({className: "col-sm-8 chat-list", ref: 'chatList'},
          ChatList({chats: this.props.chats, me: this.props.me})
        )
      ),
      ChatForm({me: this.props.me})
    );
  }
});

var ChatList = React.createClass({
  render: function(){
    var me = this.props.me;
    return React.DOM.ul({className: 'list-unstyled'},
      this.props.chats.map(function(chat){
        return  ChatMessage({chat: chat, me: me});
      })
    );
  }
});

var ChatMessage = React.createClass({
  render: function(){
    var pull;
    if (this.props.me.id === this.props.chat.get('user').id)
      pull = 'pull-right';
    else
      pull = 'pull-left';

    var timeAgo = moment(this.props.chat.get('ts')).fromNow();
    return React.DOM.li(null,
      React.DOM.div({className: 'bg-primary chat-message ' + pull}, this.props.chat.get('message')),
      React.DOM.div({className: 'clearfix'}, null),
      React.DOM.div({className: pull},
        UserView({user: this.props.chat.get('user'), size: 20, useName: true}), React.DOM.small(null, timeAgo)),
      React.DOM.div({className: 'clearfix'}, null)
    );
  }
});

var ChatForm = React.createClass({
  componentWillMount: function(){
    this.channel = postal.channel();
  },
  formSubmit: function(e){
    e.preventDefault();
    var message = this.refs.message.getDOMNode().value;
    if (message !== '')
    {
      this.channel.publish('Chat.Add', {message: message});
      this.refs.message.getDOMNode().value = '';
      this.refs.message.getDOMNode().placeholder = '';
    }else{
      this.refs.message.getDOMNode().placeholder = 'Please enter a message';
    }
  },
  render: function(){
    return React.DOM.div({className: "row"},
      React.DOM.form({onSubmit: this.formSubmit},
        React.DOM.div({className: "col-sm-2"},
          UserView({user: this.props.me, size: 50, useName: true})),
        React.DOM.div({className: "col-sm-8"},
          React.DOM.input({type: "text", className: "form-control", ref: "message"}, null)),
        React.DOM.div({className: "col-sm-2"},
          React.DOM.button({className: "btn btn-primary"}, 'Send'))
      )
    );
  }
});

var UserList = React.createClass({
  render: function(){
    var me = this.props.me;
    return React.DOM.ul({className: 'list-unstyled'},
      this.props.collection.map(function(user){
        if (me.id !== user.get('id'))
          return React.DOM.li(null, UserView({user: user, size: 50, useName: true}));
      })
    );
  }
});

var UserView = React.createClass({
  render: function(){
    var name = this.props.useName ? this.props.user.get('user') : null;
    return React.DOM.div(null,
      React.DOM.img({src: this.props.user.image(this.props.size), className: 'img-circle', title: this.props.user.get('user')}),
      name
    );
  }
});

var SocketListener = function SocketListener(noun, collection, socket){
  var addModels = function addModels(models){
      collection.add(collection.parse(models));
  };

  var removeModels = function removeModels(models){
    collection.remove(collection.parse(models));
  };

  socket.on('Add' + noun, addModels);
  socket.on('Get' + noun, addModels);
  socket.on('Remove' + noun, removeModels);

  var destroy = function destroy(){
    socket.removeListener('Add' + noun, addModels);
    socket.removeListener('Get' + noun, addModels);
    socket.removeListener('Remove' + noun, removeModels);
  };

  return {destroy: destroy};
};

var SocketSync = function SocketSync(method, model, options){
  var socket = Backbone.socket;

  var create = function create(model, options, noun){
    socket.emit('Add' + noun, model);
  };

  var read = function read(model, options, noun){
    socket.emit('Get' + noun, options);
  };

  switch(method){
    case 'create':
      create(model, options, this.noun);
      break;
    case 'read':
      read(model, options, this.noun);
      break;
  }
};

var User = Backbone.Model.extend({
  image: function(size){
    switch(this.get('type')){
      case 'local':
        return this.gravatar(size);
      case 'facebook':
        return this.facebook(size);
      case 'google':
        return this.gravatar(size);
    }
  },
  gravatar: function gravatar(size){
    return 'http://www.gravatar.com/avatar/' + md5(this.get('id')) + '?d=retro&s=' + size;
  },
  facebook: function facebook(size){
    return 'http://graph.facebook.com/' + this.get('id') + '/picture/?height=' + size;
  }
});

var UserCollection = Backbone.Collection.extend({model: User});

var RoomsCollection = Backbone.Collection.extend();

var ChatCollection = Backbone.Collection.extend({
  parse: function(data){
    if (Array.isArray(data)){
      return _.map(data, function(d){
        d.user = new User(d.user);
        return d;
      });
    }else {
      data.user = new User(data.user);
      return data;
    }
  }
});

var Router = Backbone.Router.extend({
  routes: {
    '': 'RoomSelection',
    'room/:room' : 'JoinRoom',
    '*default' : 'Default'
  }
});

var PacktChat = window.PacktChat || {};
PacktChat.Chat = function(el){
  var $root = $('#' + el),
  socket = io.connect('http://localhost:3000/packtchat'),
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
    }

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
    }

    function DefaultRoute(){
      router.navigate('', {trigger: true});
    }

    router.on('route:RoomSelection', RoomSelection);
    router.on('route:JoinRoom', JoinRoom);
    router.on('route:Default', DefaultRoute);
  };
};

var pc = new PacktChat.Chat('react-root');
