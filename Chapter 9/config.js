var config = {
	port: process.env.PORT,
	secret: process.env.SECRET,
	redisPort: process.env.REDIS_PORT,
	redisHost: process.env.REDIS_HOST,
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
	host: process.env.HOST,
	facebook: {
		appID: process.env.FACEBOOK_APPID,
		appSecret: process.env.FACEBOOK_APPSECRET
	},
	google: {
		clientID: process.env.GOOGLE_APPID,
		clientSecret: process.env.GOOGLE_APPSECRET
	},
	crypto: {
		workFactor: 5000,
		keylen: 32,
		randomSize: 256
	},
	rabbitMQ: {
		URL: process.env.RABBITMQ_URL,
		exchange: process.env.RABBITMQ_EXCHANGE
	}
};

module.exports = config;
