var agent = require('webkit-devtools-agent');
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

app.use(express.static(__dirname + '/static'));

function CPUWaster(){
  var j;
  for(var i=0; i < 10000000; i++){
    j = Math.sqrt(Math.pow(i, i));
  };
}

app.get('/', function(req, res){
  //remove/add for CPU profiling
  CPUWaster();
  res.set('Important-Header', 'test-value');
  res.send('hello world<script src="/debug.js"></script>');
});

app.post('/', function(req, res){
  res.send('<h1>POSTED</h1>');
});

app.listen(3000);
