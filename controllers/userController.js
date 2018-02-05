// userController.js

var helpers =  require('../config/helperFunctions.js');
var UserModel = require('../models/UserModel.js')

module.exports = function(server) {

	// Get all users
	
	server.get("/", function(req, res, next) {
		UserModel.find({}, function (err, users) {
			helpers.success(res, next, users);
		});
		
	});

	// Get specific user

	server.get("/user/:id", function(req, res, next) {
		req.assert('id', 'ID is required and must be numeric').notEmpty();
		var errors = req.validationErrors();
		if (errors) {
			helpers.failure(res, next, errors[0], 400);
		}
		UserModel.findOne({ _id: req.params.id }, function (err, user) {
			if (err) {
				helpers.failure(res, next, 'Something went wrong with saving user to the database', 500);
			}
			if (user === null) {
				helpers.failure(res, next, 'The specified user could not be found', 404);
			}
			helpers.success(res, next, user);
		});
		// helpers.success(res, next, users[parseInt(req.params.id)]);
	});


	// Add user

	server.post("/user", function(req, res, next) {
		req.assert('first_name', 'First name is required').notEmpty();
		req.assert('last_name', 'Last name is required').notEmpty();
		req.assert('email_address', 'Email address is required and must be a valid email').notEmpty().isEmail();
		req.assert('career', 'The career must be either Student, Teacher, or Professor').isIn(['student', 'teacher', 'professor']);
		var errors = req.validationErrors();
		if (errors) {
			helpers.failure(res, next, errors, 400);
		}

		var user = new UserModel();
		user.first_name = req.params.first_name;
		user.last_name = req.params.last_name;
		user.email_address = req.params.email_address;
		user.career = req.params.career;
		user.save(function (err) {
			if (err) {
				helpers.failure(res, next, 'Error saving user to the database', 500);
			}
			helpers.success(res, next, user);
		});

	});


	// Update user

	server.put("/user/:id", function(req, res, next) {
		req.assert('id', 'ID is required and must be numeric').notEmpty();
		var errors = req.validationErrors();
		if (errors) {
			helpers.failure(res, next, errors[0], 400);
		}

		UserModel.findOne({ _id: req.params.id }, function (err, user) {
			if (err) {
				helpers.failure(res, next, 'Something went wrong with saving user to the database', 500);
			}
			if (user === null) {
				helpers.failure(res, next, 'The specified user could not be found', 404);
			}
			var updates = req.params;
			delete updates.id;
			for (var field in updates) {
				user[field] = updates[field];
			}
			user.save(function (err) {
				if (err) {
					helpers.failure(res, next, 'Error saving user to the database', 500);
				}
				helpers.success(res, next, user);
			});
		});

		// ** Fake DB **
		// if (typeof(users[req.params.id]) === 'undefined') {
		// 	helpers.failure(res, next, 'The specified user could not be found in the database', 404);
		// 	return next();
		// }
		// var user = users[parseInt(req.params.id)];
	});

	// Delete user

	server.del("/user/:id", function(req, res, next) {
		req.assert('id', 'ID is required and must be numeric').notEmpty();
		var errors = req.validationErrors();
		if (errors) {
			helpers.failure(res, next, errors[0], 400);
		}
		UserModel.findOne({ _id: req.params.id }, function (err, user) {
			if (err) {
				helpers.failure(res, next, 'Something went wrong with saving user to the database', 500);
			}
			if (user === null) {
				helpers.failure(res, next, 'The specified user could not be found', 404);
			}
			user.remove(function (err) {
				if (err) {
					helpers.failure(res, next, 'Error removing user from the database', 500);
				}
				helpers.success(res, next, user);
			});
		});
	});


}