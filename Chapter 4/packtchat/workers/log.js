var rabbitPromise = require('../queue/rabbit'),
  config = require('../config');

rabbitPromise.done(function(rabbit){
  rabbit.queue('debug.log', {autoDelete: false}, function(q){
    q.bind(config.rabbitMQ.exchange, '*.log');
    q.subscribe({ ack: true, prefetchCount: 1 }, function(message, headers, delivery, messageObject){
      console.log('Debug-Routing:' + delivery.routingKey + JSON.stringify(message));
      messageObject.acknowledge();
      //setTimeout(function(){messageObject.reject(true);}, 2000);
    });
  });

  rabbit.queue('error.log', {autoDelete: false}, function(q){
    q.bind(config.rabbitMQ.exchange, 'error.log');
    q.subscribe({ ack: true, prefetchCount: 1 }, function(message, headers, delivery, messageObject){
      console.log('Error-Routing:' + delivery.routingKey + JSON.stringify(message));
      messageObject.acknowledge();
    });
  });

});
