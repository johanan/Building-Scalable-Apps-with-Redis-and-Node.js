var util = require('../middleware/utilities'),
	config = require('../config'),
	user = require('../passport/user');

module.exports.index = index;
module.exports.login = login;
module.exports.logOut = logOut;
module.exports.chat = chat;
module.exports.register = register;
module.exports.registerProcess = registerProcess;

function index(req, res){
	res.render('index', {title: 'Index'});
};

function login(req, res){
	res.render('login', {title: 'Login', message: req.flash('error')});
};

function register(req, res){
	res.render('register', {title: 'Register', message: req.flash('error')});
};

function registerProcess(req, res){
	if (req.body.username && req.body.password)
	{
		user.addUser(req.body.username, req.body.password, config.crypto.workFactor, function(err, profile){
			if (err) {
				req.flash('error', err);
				res.redirect(config.routes.register);
			}else{
				req.login(profile, function(err){
					res.redirect(config.routes.chat);
				});
			}
		});
	}else{
		req.flash('error', 'Please fill out all the fields');
		res.redirect(config.routes.register);
	}
};

function logOut(req, res){
	util.logOut(req);
	res.redirect('/');
};

function chat(req, res){
	res.render('chat', {title: 'Chat'});
};
