var redis = require('redis'),
  config = require('../config');

var client = redis.createClient(config.redisPort, config.redisHost);

exports.client = client;
