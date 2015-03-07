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
			MongoClient.connect("mongodb://", function(
					err, db) {
				if (!err) {
					console.log("We are connected");
					db.authenticate('', '', function(err,
							result) {
						if (!err) {
							var collection = db.collection('ipaddress');
							var doc1 = {
								'ipaddress' : req.connection.remoteAddress
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
			MongoClient.connect("mongodb://", function(
					err, db) {
				if (!err) {
					console.log("We are connected");
					db.authenticate('', '', function(err,
							result) {
						if (!err) {
							var collection = db.collection('ipaddress');
							var doc1 = {
								'ipaddress' : '0'
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
			MongoClient.connect("mongodb://", function(
			err, db) {
				if (!err) {
					console.log("We are connected");
					db.authenticate('', '', function(err,
							result) {
						if (!err) {
							var collection = db.collection('ipaddress');
							collection.distinct('ipaddress', function(err, results) {
								if(!err) {
									returndata = results;
									var geoip = require('geoip-lite');
									var j=0;
									var t=0;
									for(var i=0;i<returndata.length;i++) {
										if(returndata[i] != null && returndata != 'null' && returndata != 'NULL'){				
											console.log(returndata[i]);
											var geo = geoip.lookup(returndata[i]);
											if(geo) {
												var returndatag = {	"lat":geo.ll[0],
																	"lon":geo.ll[1], 
																	"country": geo.country,
																	"city": geo.city,
																	"ip": returndata[i]};
												returndataf[j] = returndatag;
												j++;
											} else {
												console.log("#### no geo - "+(t++));
											}
										}
									}
									res.json(returndataf);
								} else {
									console.log(err);
								} 
						        // Let's close the db
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