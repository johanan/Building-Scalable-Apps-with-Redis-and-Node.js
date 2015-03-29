var config = {
	port: 3000,
	secret: 'secret',
	redisUrl: 'redis://localhost',
	routes: {
		login: '/account/login',
		logout: '/account/logout'
	}
};

module.exports = config;