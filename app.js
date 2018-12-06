const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const mongoDB = `mongodb://127.0.0.1:27017/RealtimeWebOffice`;

const passportManager = require('./config/passportManager');
const routerManager = require('./config/routerManager');
const controllerManager = require('./config/controllerManager');
const app = express();

// mongoDB setup
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect(mongoDB,  { useCreateIndex :  true, useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: '123', resave: true, saveUninitialized: false}));

passportManager(passport);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

routerManager(app);
controllerManager(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
