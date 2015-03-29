var config = {
	port: 3000,
	secret: 'secret',
	redisPort: 6379,
	redisHost: 'localhost',
	routes: {
		login: '/account/login',
		logout: '/account/logout',
		chat: '/chat',
		register: '/account/register',
		facebookAuth: '/auth/facebook',
		facebookAuthCallback: '/auth/facebook/callback',
		googleAuth: '/auth/google',
		googleAuthCallback: '/auth/google/callback'
	},
	host: 'http://localhost:3000',
	facebook: {
		appID: 'YOUR_ID',
		appSecret: 'YOUR_SECRET',
	},
	google: {
		clientID: 'YOUR_ID',
		clientSecret: 'YOUR_SECRET'
	},
	crypto: {
		workFactor: 5000,
		keylen: 32,
		randomSize: 256
	},
	rabbitMQ: {
		URL: 'amqp://guest:guest@localhost:5672',
		exchange: 'packtchat.log'
	}
};

module.exports = config;
