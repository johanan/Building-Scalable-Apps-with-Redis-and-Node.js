var passUtil = require('./password');

var Users = {
	josh: {
		salt: 'G81lJERghovMoUX5+RoasvwT7evsK1QTL33jc5pjG0w=',
    password: 'DAq+sDiEbIR0fHnbzgKQCOJ9siV5CL6FmXKAI6mX7UY=',
    work: 5000,
    displayName: 'Josh',
    id: 'josh',
    provider: 'local',
    username: 'josh'
	},
	brian: {
		salt: 'Mh5EdMSe0WT8FedHqaCg+RIC12yUpsn/T0sAq/ttaQI=',
		password: 'CkAMxwp9KwaAMi+RgX1QtcAi0VQ9q7tH+d0/BdRYSpY=',
		work: 5000,
		displayName: 'Brian',
		id: 'brian',
		provider: 'local',
		username: 'brian'
	},
	test: {
		displayName: 'Test',
		id: 'test',
		password: 'nUPpnFNFXP2Q8rIs/f25Yr4AFK6K6AVJt/xarHRAweM=',
		provider: 'local',
		salt: '/T/4Q6I43+VtqMTSnuHOZsNg1XCMZw6dI5SZE3rzNyY=',
		username: 'test',
		work: 50
	}
};

var findByUsername = function findByUsername(username, cb){
	cb(null, Users[username]);
};

var addUser = function addUser(username, password, work, cb){
	if(Users[username] === undefined)
	{
		passUtil.passwordCreate(password, function(err, salt, password){
			Users[username] = {
				salt: salt,
				password: password,
				work: work,
				displayName: username,
				id: username,
				provider: 'local',
				username: username
			};

			return cb(null, Users[username]);
		});
	}else{
		return cb('User exists!', null);
	}
};

var updatePassword = function(username, password, work){
	passUtil.passwordCreate(password, function(err, salt, password){
		Users[username].salt = salt;
		Users[username].password = password;
		Users[username].work = work;
	});
};

exports.findByUsername = findByUsername;
exports.addUser = addUser;
exports.updatePassword = updatePassword;
