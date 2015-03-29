var config = {
	port: 3000,
	secret: 'secret',
	redisPort: 6379,
	redisHost: 'localhost',
	routes: {
		login: '/account/login',
		logout: '/account/logout'
	}
};

module.exports = config;