#!/usr/bin/env node
// server.js

'use strict';

const createError 		= require('http-errors');
const express        	= require('express');
const path 				= require('path');
const bodyParser     	= require('body-parser');
const cookieParser 		= require('cookie-parser');
const morgan			= require('morgan');

const Twig 				= require('twig'), // Twig module
      twig 				= Twig.twig; 

//const MongoClient    	= require('mongodb');
const mongoose 			= require('mongoose');
const passport 			= require('passport');
const flash    			= require('connect-flash');

const session      		= require('express-session');

const program 			= require('commander');

const port 				= process.env.PORT || 8080;
const app            	= express();

const configDB 			= require('./config/database.js');

// Command Line
// ===============================================================
// create option setter for command line
let setOption = (option, value) => {
  	 
}
// https://medium.freecodecamp.org/writing-command-line-serverlications-in-nodejs-2cf8327eee2
program
	.version('0.0.1')
	.option('-h, --host [optional]', 'Give a new host').action(setOption)
	.option('-m, --max-users [optional]', 'Limit maximum users').action(setOption)
	//.option('-x, --xxx','with parameter, this return true or false')
	//.option('-I, --another-input <required>','required user input')
	.parse(process.argv); // end with parse to parse through the input

// WebPack 
// ===============================================================

//const webpack 			= require('./config/webpack.js')(path);


// MongoDB 
// ===============================================================
mongoose.connect(configDB.url, { useNewUrlParser: true }); // connect to our database

// required for passport
//app.use(session());
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(morgan('devstart'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes 
// ======================================================================
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');

app.use('/', indexRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
