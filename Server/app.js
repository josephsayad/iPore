var appName = 'API';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var sessions = require('client-sessions');

var index = require('./routes/index');
var api = require('./routes/api');
var account = require('./routes/account');

var mongodbUrl = 'mongodb://localhost/' + appName;
mongoose.connect(mongodbUrl, function(error, response) {
  if (error) {
    console.log('[Server] ' + error);
  } 
  else {
  	var apiDetail = ' is active. Connected to MongoDB.';
    console.log('[Server] ' + appName + apiDetail);
  }
});

var app = express();

/* View engine setup */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessions({
  cookieName: 'session', // key name added to the request object 
  secret: '729refvvw&rt234*EmEmbE2flRPvr9^84+' // large unguessable string 
}));

app.use('/', index);
app.use('/api', api);
app.use('/account', account);

/* Catch 404, and forward to error handler */

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* Error handler */

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
