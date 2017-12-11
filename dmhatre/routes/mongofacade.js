/**
 * New node file
 */

exports.mf_insert = function(req, res) {

	try {

		if (req.connection.remoteAddress != null
				&& req.connection.remoteAddress != undefined) {
			// Retrieve
			var MongoClient = require('mongodb').MongoClient;

			// Connect to the db
			MongoClient.connect("mongodb://127.0.0.1:27017/dbname", function(
					err, db) {
				if (!err) {
					console.log("We are connected");
					db.authenticate('user', 'password', function(err,
							result) {
						if (!err) {
							var collection = db.collection('ipaddress');
							var doc1 = {
								'ipaddress' : req.connection.remoteAddress,
								'current_date': new Date()
							};
							collection.insert(doc1, function(err, result) {
								if(!err){
									console.log("inserted successfully");
								} else {
									console.log("err inserting");
								}
								db.close();
								//MongoClient.close();
							});
						} else {
							console.log("Database authentication error");
							//MongoClient.close();
						}
					});
				} else {
					console.log("Error connecting to database");
				}
			});

		} else {
			// Retrieve
			var MongoClient = require('mongodb').MongoClient;

			// Connect to the db
			MongoClient.connect("mongodb://127.0.0.1:27017/dbname", function(
					err, db) {
				if (!err) {
					console.log("We are connected");
					db.authenticate('user', 'password', function(err,
							result) {
						if (!err) {
							var collection = db.collection('ipaddress');
							var doc1 = {
								'ipaddress' : '0',
								'current_date': new Date()
							};
							collection.insert(doc1, function(err, result) {
								if(!err){
									console.log("inserted successfully");
								} else {
									console.log("err inserting");
								}
								db.close();
								//MongoClient.close();
							});
						} else {
							console.log("Database authentication error");
							//MongoClient.close();
						}
					});
				} else {
					console.log("Error connecting to database");
				}
			});

		}
	} catch (err) {
		console.log(err.message);
	}
};

exports.mf_getIpAddresses = function(req, res) {
	
	var returndata=null;
	var returndataf=[];
	
	try {
			// Retrieve
			var MongoClient = require('mongodb').MongoClient;

			// Connect to the db
			MongoClient.connect("mongodb://127.0.0.1:27017/dbname", function(
			err, db) {
				if (!err) {
					console.log("We are connected");
					db.authenticate('user', 'password', function(err,
							result) {
						if (!err) {
							var collection = db.collection('ipaddress');
							collection.distinct('ipaddress', function(err, results) {
								if(!err) {
									res.json(results);
								} else {
									console.log(err);
								} 
						        db.close();
						     });
						} else {
							console.log("Database authentication error");
						}
					});
				} else {
					console.log("Error connecting to database");
				}
			});
	} catch (err) {
		console.log(err.message);
	}
};