// setupController.js

module.exports = function(server, restify, restifyValidator) {
	server.use(restify.plugins.acceptParser(server.acceptable));
	server.use(restify.plugins.queryParser());
	server.use(restify.plugins.bodyParser());
	server.use(restifyValidator);

	// API Key Authorization

	server.use(restify.authorizationParser());
	server.use(function(req, res, next) {
		// Valid API Keys Object
		var apiKeys = {
			'user1': 'dsjv837hkljncu8mxnuei9'
		};
		if (typeof(req.authorization.basic) === 'undefined' || !apiKeys[req.authorization.basic.username] || req.authorization.basic.password !== apiKeys[req.authorization.basic.username]) {
			var response = {
				'status': 'failure',
				'data': 'You must specify a valid API key'
			}
			res.setHeader('content-type', 'application/json');
			res.writeHead(403);
			res.end(JSON.stringify(response));
			return next();
		}
		return next();
	});

	// Whitelisted IP Authorization

	server.use(function(req, res, next) {
		// Valid IP Addresses Object 
		var whitelistIps = ['111.222.333.444'];
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		if (whitelistIps.indexOf(ip) === -1) {
			var response = {
				'status': 'failure',
				'data': 'Invalid IP address'
			}
			res.setHeader('content-type', 'application/json');
			res.writeHead(403);
			res.end(JSON.stringify(response));
			return next();
		}
		return next();
	});


	// API Throttle Control

	server.use(restify.throttle( {
		rate: 1,
		burst: 2,
		xff: true
	}));


}
