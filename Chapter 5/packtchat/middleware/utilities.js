var config = require('../config');

module.exports.csrf = function csrf(req, res, next){
	res.locals.token = req.csrfToken();
	next();
};

module.exports.authenticated = function authenticated(req, res, next){
	req.session.isAuthenticated = req.session.passport.user !== undefined;
	res.locals.isAuthenticated = req.session.isAuthenticated;
	if (req.session.isAuthenticated) {
		res.locals.user = req.session.passport.user;
	}
	next();
};

module.exports.requireAuthentication = function requireAuthentication(req, res, next){
	if (req.session.isAuthenticated) {
		next();
	}else {
		res.redirect(config.routes.login);
	}
};

module.exports.logOut = function logOut(req){
	req.session.isAuthenticated = false;
	req.logout();
};

module.exports.templateRoutes = function templateRoutes(req, res, next){
	res.locals.routes = config.routes;

	next();
};
