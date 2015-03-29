var express = require('express');
var app = express();

app.use(function logger(req, res, next){
	console.log(req.url);
	next()
});
app.get(/^.*$/, function(req, res){
	res.send('Express Response');
});

app.listen(3000);