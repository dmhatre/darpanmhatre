
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , mongofacade = require('./routes/mongofacade')
  , http = require('http')
  , path = require('path');

var app = express();
// all environments
app.set('port', process.env.PORT || 80);
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(function(req, res, next) {
	  // Put some preprocessing here.
	  //console.log("intercepted");
	  next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var analyticsFilter = function(req, res, next) {
	  // Put the preprocessing here.
	  mongofacade.mf_insert(req, res);
	  next();
};
process.on('uncaughtException', function(err) {
	  console.log('########################');
	  console.log('########################');
	  console.log('Caught exception: ' + err);
	  console.log('########################');
	  console.log('########################');
});

app.get('/', analyticsFilter, routes.index);
app.get('/rome', analyticsFilter, user.rome);
app.get('/nice', analyticsFilter, user.nice);
app.get('/versailles', analyticsFilter, user.versailles);
app.get('/paris', analyticsFilter, user.paris);
app.get('/weddingreception', analyticsFilter, user.weddingreception);
app.get('/weddingvows', analyticsFilter, user.weddingvows);
app.get('/prewedding', analyticsFilter, user.prewedding);
app.get('/engagement', analyticsFilter, user.engagement);
app.get('/gallery', analyticsFilter, user.gallery);
app.get('/summary', analyticsFilter, user.summary);
app.get('/skills', analyticsFilter, user.skills);
app.get('/experience', analyticsFilter, user.experience);
app.get('/education', analyticsFilter, user.education);
app.get('/installnode', analyticsFilter, user.installnode);
app.get('/installredis', analyticsFilter, user.installredis);
app.get('/spring4mvc', analyticsFilter, user.spring4mvc);
app.get('/createnodejsserver', analyticsFilter, user.createnodejsserver);
app.get('/usescreen', analyticsFilter, user.usescreen);
app.get('/contactinfo', analyticsFilter, user.contactinfo);
app.get('/admin', analyticsFilter, user.admin);
app.get('/javaservlet', analyticsFilter, user.javaservlet);
app.get('/getIPAddresses', analyticsFilter, mongofacade.mf_getIpAddresses);
app.get('/downloadresume', analyticsFilter, function(req, res) {
	var file = __dirname + '/views/Darpan_resume.doc';
	res.setHeader('Content-disposition', 'attachment; filename=darpan_resume.doc');
	res.setHeader("Content-Type", "application/ms-word");
	res.download(file);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
