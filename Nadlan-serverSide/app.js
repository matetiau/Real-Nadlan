var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var session = require('express-session');
var flash = require('connect-flash');
const config = require('./config/database');
const mongoose = require('mongoose');
const passport = require('passport');
var bodyParser = require('body-parser');
var app = express();

mongoose.connect('mongodb://localhost:27017/housestore', { useNewUrlParser: true });
var db = mongoose.connection;



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');






app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// view engine setup


app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use(express.static('uploads'));

// Passport Config
require('./config/passport')(passport);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req,res,next){
  res.locals.user = req.user || null;
  next();
})



app.use(session({
  secret: 'yousecret',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});



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
