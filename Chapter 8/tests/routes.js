var routes = require('../routes'),
  config = require('../config'),
  nodeunit = require('nodeunit'),
  Request = require('./request'),
  Response = require('./response');

exports.indexRouteTest = function(test){
  var res = new Response();
  test.equal(res.view, undefined);
  routes.index({}, res);
  test.equal(res.view, 'index');
  test.equal(res.viewData.title, 'Index');
  test.done();
};

exports.loginRouteTest = function(test){
  var res = new Response();
  var req = new Request();
  test.equal(res.view, undefined);
  routes.login(req, res);
  test.equal(res.view, 'login');
  test.equal(res.viewData.title, 'Login');
  test.equal(res.viewData.message, 'error');
  test.done();
};

exports.registerRouteTest = function(test){
  var res = new Response();
  var req = new Request();
  test.equal(res.view, undefined);
  routes.register(req, res);
  test.equal(res.view, 'register');
  test.equal(res.viewData.title, 'Register');
  test.equal(res.viewData.message, 'error');
  test.done();
};

exports.chatRouteTest = function(test){
  var res = new Response();
  test.equal(res.view, undefined);
  routes.chat({}, res);
  test.equal(res.view, 'chat');
  test.equal(res.viewData.title, 'Chat');
  test.done();
};

exports.logoutTest = function(test){
  var res = new Response();
  var req = new Request();
  req.logoutCalled = false;
  routes.logOut(req, res);
  test.equal(req.logoutCalled, true);
  test.equal(res.url, '/');
  test.done();
};
