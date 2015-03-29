var util = require('../middleware/utilities'),
  config = require('../config'),
  nodeunit = require('nodeunit'),
  Request = require('./request'),
  Response = require('./response');

exports.requireAuthTest = nodeunit.testCase({
  setUp: function(cb){
    this.req = new Request();
    this.res = new Response();
    this.nextExecuted = false;
    this.next = function(){this.nextExecuted = true}.bind(this);
    cb();
  },
  'Not Authenticated': function(test){
    this.req.session.isAuthenticated = false;
    util.requireAuthentication(this.req, this.res, this.next);
    test.equal(this.res.url, config.routes.login);
    test.equal(this.nextExecuted, false);
    test.done();
  },
  'Authenticated': function(test){
    this.req.session.isAuthenticated = true;
    test.equal(this.nextExecuted, false);
    util.requireAuthentication(this.req, this.res, this.next);
    test.equal(this.res.url, '');
    test.equal(this.nextExecuted, true);
    test.done();
  }
});

exports.csrfTest = nodeunit.testCase({
  setUp: function(cb){
    this.req = new Request();
    this.res = new Response();
    this.nextExecuted = false;
    this.next = function(){this.nextExecuted = true}.bind(this);
    cb();
  },
  'CSRF should be set': function(test){
    util.csrf(this.req, this.res, this.next);
    test.equal(this.res.locals.token, 'csrf');
    test.equal(this.nextExecuted, true);
    test.done();
  }
});

exports.routesTest = nodeunit.testCase({
  setUp: function(cb){
    this.req = new Request();
    this.res = new Response();
    this.nextExecuted = false;
    this.next = function(){this.nextExecuted = true}.bind(this);
    cb();
  },
  'Routes should be set from Config': function(test){
    util.templateRoutes(this.req, this.res, this.next);
    test.equal(this.res.locals.routes, config.routes);
    test.equal(this.nextExecuted, true);
    test.done();
  }
});

exports.logOutTest = nodeunit.testCase({
  setUp: function(cb){
    this.req = new Request();
    this.req.logoutCalled = false;
    cb();
  },
  'Should change isAuthenticated to false': function(test){
    this.req.session.isAuthenticated = true;
    test.equal(this.req.session.isAuthenticated, true);
    test.equal(this.req.logoutCalled, false);
    util.logOut(this.req);
    test.equal(this.req.session.isAuthenticated, false);
    test.equal(this.req.logoutCalled, true);
    test.done();
  }
});

exports.authenticatedTest = nodeunit.testCase({
  setUp: function(cb){
    this.req = new Request();
    this.res = new Response();
    this.nextExecuted = false;
    this.next = function(){this.nextExecuted = true}.bind(this);
    cb();
  },
  'Not Authenticated': function(test){
    this.req.session.isAuthenticated = false;
    this.req.session.passport.user = undefined;
    test.equal(this.nextExecuted, false);
    util.authenticated(this.req, this.res, this.next);
    test.equal(this.req.session.isAuthenticated, false);
    test.equal(this.res.locals.isAuthenticated, false);
    test.equal(this.nextExecuted, true);
    test.done();
  },
  'Authenticated': function(test){
    this.req.session.isAuthenticated = false;
    this.req.session.passport.user = {name: 'Josh'};
    test.equal(this.nextExecuted, false);
    test.equal(this.res.locals.user, undefined);
    util.authenticated(this.req, this.res, this.next);
    test.equal(this.req.session.isAuthenticated, true);
    test.equal(this.res.locals.isAuthenticated, true);
    test.equal(this.res.locals.user.name, 'Josh');
    test.equal(this.nextExecuted, true);
    test.done();
  }
});
