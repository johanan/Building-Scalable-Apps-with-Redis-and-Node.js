var config = require('../config');

exports.csrf = function csrf(req, res, next){
	res.locals.token = req.csrfToken();
	next();
};

exports.authenticated = function authenticated(req, res, next){
	req.session.isAuthenticated = req.session.passport.user !== undefined;
	res.locals.isAuthenticated = req.session.isAuthenticated;
	if (req.session.isAuthenticated) {
		res.locals.user = req.session.passport.user;
	}
	next();
};

exports.requireAuthentication = function requireAuthentication(req, res, next){
	if (req.session.isAuthenticated) {
		next();
	}else {
		res.redirect(config.routes.login);
	}
};

exports.logOut = function logOut(req){
	req.session.isAuthenticated = false;
	req.logout();
};

exports.templateRoutes = function templateRoutes(req, res, next){
	res.locals.routes = config.routes;

	next();
};
