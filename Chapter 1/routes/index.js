var util = require('../middleware/utilities'),
	config = require('../config');

module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.logOut = logOut;
module.exports.chat = chat;

function index(req, res){
	res.render('index', {title: 'Index'});
};

function login(req, res){
	res.render('login', {title: 'Login', message: req.flash('error')});
};

function loginProcess(req, res){
	var isAuth = util.auth(req.body.username, req.body.password, req.session);
	if (isAuth) {
		res.redirect('/chat');
	}else {
		req.flash('error', 'Wrong Username or Password');
		res.redirect(config.routes.login);
	}
};

function logOut(req, res){
	util.logOut(req.session);
	res.redirect('/');
};

function chat(req, res){
	res.render('chat', {title: 'Chat'});
};
