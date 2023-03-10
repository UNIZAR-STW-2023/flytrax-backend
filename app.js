var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');

const mongoose = require('mongoose');
const config = require('./app_server/config');

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');

var app = express();


//Conexión a la base de datos
mongoose.connect(config.DB_CONN, {
        useNewUrlParser: true
    }).then(db => console.log('Conectado correctamente'))
    .catch(err => console.log('error: ', err))


// view engine setup
app.set('views', path.join(__dirname, 'app_server' ,'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
