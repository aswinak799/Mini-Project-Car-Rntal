var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var database = require('./config/connection')
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var driverRouter = require('./routes/driver');
var hbs=require('express-handlebars')
var app = express();
var session=require('express-session')
// var expressValidator = require('express-validator');
var flash = require('express-flash');
var fileUpload = require('express-fileupload')
// Require handlebars and just-handlebars-helpers
const Handlebars = require('handlebars');
const H = require('just-handlebars-helpers');





// Register just-handlebars-helpers with handlebars
H.registerHelpers(Handlebars);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:'layout',layoutDir:__dirname+'/views/layouts/',partialDir:__dirname+'views/partials/'}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload())
app.use(session({secret:"key",cookie:{maxAge:30 * 24 * 60 * 60 * 1000}}))
//maxAge: 30 * 24 * 60 * 60 * 1000

//app.use(flash());
// app.use(expressValidator());

app.use('/', usersRouter);
app.use('/admin', adminRouter);
app.use('/driver', driverRouter);

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
