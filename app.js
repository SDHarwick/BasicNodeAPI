var restify = require('restify');
// var plugins = require('restify-plugins');
var server = restify.createServer();
var setupController = require('./controllers/setupController.js');
var userController = require('./controllers/userController.js');
var restifyValidator = require('restify-validator');
var config =  require('./config/dbConnection.js');
var mongoose = require('mongoose');


mongoose.connect(config.getMongoConnection());


setupController(server, restify, restifyValidator);
userController(server);

server.listen(8082, function() {
  console.log('%s listening at %s', server.name, server.url);
});






// var restify = require('restify');
// var server = restify.createServer();

// // this is a comment

// var users = {};
// var max_user_id = 0;

// server.use(restify.acceptParser(server.acceptable));
// server.use(restify.bodyParser());
// server.use(restify.queryParser());

// server.get("/", function(req, res, next) {
// 	res.setHeader('content-type', 'application/json');
// 	res.writeHead(200);
// 	res.end(JSON.stringify(users));
// 	return next();
// });

// server.get("/user/:id", function(req, res, next) {
// 	res.setHeader('content-type', 'application/json');
// 	res.writeHead(200);
// 	res.end(JSON.stringify(users[parseInt(req.params.id)]));
// 	return next();
// });

// server.post("/user", function(req, res, next) {
// 	var user = req.params;
// 	max_user_id++;
// 	user.id = max_user_id;
// 	users[user.id] = user;
// 	res.setHeader('content-type', 'application/json');
// 	res.writeHead(200);
// 	res.end(JSON.stringify(user));
// 	return next();
// });

// server.put("/user/:id", function(req, res, next) {
// 	var user = users[parseInt(req.params.id)];
// 	var updates = req.params;
// 	for (var field in updates) {
// 		user[field] = updates[field];
// 	}
// 	res.setHeader('content-type', 'application/json');
// 	res.writeHead(200);
// 	res.end(JSON.stringify(user));
// 	return next();
// });

// server.del("/user/:id", function(req, res, next) {
// 	delete users[parseInt(req.params.id)];
// 	res.setHeader('content-type', 'application/json');
// 	res.writeHead(200);
// 	res.end(JSON.stringify(true));
// 	return next();
// });

// server.listen(8080, function() {
//   console.log('%s listening at %s', server.name, server.url);
// });