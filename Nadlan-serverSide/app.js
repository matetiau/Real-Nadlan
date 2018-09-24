var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
const config = require('./config/database');
const mongoose = require('mongoose');
const passport = require('passport');
var session = require('express-session');
mongoose.connect('config.databse');
var db = mongoose.connection;
var MemoryStore = session.MemoryStore;
var app = express();




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');






app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// view engine setup



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(flash());
app.use(session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use(express.static('uploads'));

// Passport Config

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(express.session({
  key: "mysite.sid.uid.whatever",
  secret: "1234567890QWERTY",
  cookie: {
    maxAge: 2678400000 // 31 days
  },
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
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
