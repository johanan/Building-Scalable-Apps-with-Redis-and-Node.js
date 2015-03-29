var exchange = require('../queue');

function debug(message){
	exchange.done(function(ex){
		ex.publish('debug.log', message);
	});
};

function error(message){
	exchange.done(function(ex){
		ex.publish('error.log', message);
	});
}

exports.logger = function logger(req, res, next){
	debug({url: req.url, ts: Date.now()});
	next();
};

exports.debug = debug;
exports.error = error;
