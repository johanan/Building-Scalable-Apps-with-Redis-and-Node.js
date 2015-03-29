var agent = require('webkit-devtools-agent');
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

server.setMaxListeners(1000000);
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.set('Important-Header', 'test-value');
  res.send('hello world<script src="/feleak.js"></script>');
});

server.listen(3000);
