var express = require('express'),
  amqp = require('amqp'),
  io = require('socket.io');

var app = express();

app.use(express.static(__dirname));

var rabbit = amqp.createConnection();

rabbit.on('ready', function(){
  rabbit.exchange('credit_charge', {autoDelete: false}, function(ex){
    rabbit.queue('charge', {autoDelete: false}, function(q){
      q.bind('credit_charge', q.name);
      q.close();
      startServer(ex);
    });
  });
});

function startServer(ex)
{
  app.get('/credit_charge', function(req, res){
    rabbit.queue('', {exclusive: true, autoDelete: true}, function(q){
      q.bind('credit_charge', q.name);
      ex.publish('charge', {card: 'details'}, {replyTo: q.name});
      q.subscribe(function(message){
        console.log(message);
        q.destroy();
        q.close();
        res.send('Charged! Thanks!');
      });
    });
  });

  var server = app.listen(8002);
  io = io.listen(server);

  io.on('connection', function(socket){
    rabbit.queue(socket.id, {exclusive: true, autoDelete: true}, function(q){
      q.bind('credit_charge', q.name);

      q.subscribe(function(message, headers, delivery){
        socket.emit(headers.emitEvent);
      });

      socket.on('charge', function(data){
        ex.publish('charge', {card: 'details'}, {replyTo: q.name, headers: {emitEvent: 'charged'}});
      });

      socket.on('disconnect', function(){
        q.destroy();
        q.close();
      });

    });
  });

};
