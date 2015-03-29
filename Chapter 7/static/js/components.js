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
    )
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
    )
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
    )
  }
});

var UserList = React.createClass({
  render: function(){
    var me = this.props.me;
    return React.DOM.ul({className: 'list-unstyled'},
      this.props.collection.map(function(user){
        if (me.id !== user.get('id'))
          return React.DOM.li(null, UserView({user: user, size: 50, useName: true}))
      })
    )
  }
});

var UserView = React.createClass({
  render: function(){
    var name = this.props.useName ? this.props.user.get('user') : null;
    return React.DOM.div(null,
      React.DOM.img({src: this.props.user.image(this.props.size), className: 'img-circle', title: this.props.user.get('user')}),
      name
    )
  }
});
