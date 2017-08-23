var config = {
	port: 3000,
	secret: 'secret',
	//set this to the port of your Redis install
	//you can use Docker now for ease
	redisUrl: 'redis://localhost:32768',
	routes: {
		login: '/account/login',
		logout: '/account/logout'
	}
};

module.exports = config;
