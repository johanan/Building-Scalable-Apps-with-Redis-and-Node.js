var amqp = require('amqp');

var rabbit = amqp.createConnection();

rabbit.on('ready', function(){
  rabbit.queue('first-queue-name', {autoDelete: false}, function(q){
    q.bind('my-first-exchange', 'first-queue');
    q.subscribe(function(message, headers, deliveryInfo, messageObject){
      console.log(message);
      console.log(headers);
      console.log(deliveryInfo);
      console.log(messageObject);
    });
  });
});
