var log = require('./log');

exports.notFound = function notFound(req, res, next){
	res.status(404).render('404', {title: 'Wrong Turn'});
};

exports.error = function error(err, req, res, next){
	log.error({error: err.message, stack: err.stack, ts: Date.now()});
	res.status(500).render('500', {title: 'Mistakes Were Made'});
};
