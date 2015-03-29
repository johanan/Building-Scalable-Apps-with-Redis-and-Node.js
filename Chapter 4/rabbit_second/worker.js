var amqp = require('amqp');

var rabbit = amqp.createConnection();

rabbit.on('ready', function(){
  rabbit.exchange('credit_charge', {autoDelete: false}, function(ex){
    rabbit.queue('charge', {autoDelete: false}, function(q){
      q.bind('credit_charge', 'charge');
      q.subscribe(function(message, headers, deliveryInfo, messageObject){
        setTimeout(function(){
          console.log(message);
          console.log(headers);
          console.log(deliveryInfo);
          ex.publish(deliveryInfo.replyTo, {message: 'done'}, {headers: headers});
        }, 1500);
      });
    });
  });
});
