require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var cors = require('cors')

var status = process.env.NODE_ENV || 'dev'
mongoose.connect(`mongodb://localhost/activoverflow-${status}`);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`connected to activoverflow-${status}`)
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var questionRouter = require('./routes/questions');
var answersRouter = require('./routes/answers');
var tagsRouter = require('./routes/tags');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/questions', questionRouter);
app.use('/answers', answersRouter);
app.use('/tags', tagsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.status(400).json(err);
});



module.exports = app;
