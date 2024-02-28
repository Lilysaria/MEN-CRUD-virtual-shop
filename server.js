require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const passport = require('passport');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const productRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');


const app = express();

// require our database.js file to establish the 
// connection between our server (express) and
// mongodb (Database) server on mongodb atlas
require('./config/database')
require('./config/passport')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// We need methodOverride for the server to handle requests that want to be put 
// or delete requests
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))
// ALWAYS SETUP PASSPORT AFTER YOUR SESSION, because PASSPORT USES The cookie you make with the session
app.use(passport.initialize());
app.use(passport.session());

// and before the controllers ^^^^^^^ because the controllers want access to req.user! Passport defines req.user for us!

// This piece of middleware we'll inject in the req.user, we'll call it user
// into every ejs template when we respond to the client
// this must occurr before our controller functions and after passport
app.use(function(req, res, next){
  res.locals.user = req.user; // req.user we get from passport and its the logged in user
  // if req.user is undefined, no one is logged, if it is defined, its the users mongoose document
  // res.locals you can attach variable names for all ejs files
  // so here .user is the variable name
  next(); // pass the request and res to the next piece of middleware
})



app.use('/', indexRouter);
app.use('/products', productRouter);
app.use('/orders', ordersRouter);
// related resources are mounted at /
// because there is not consitent naming convention


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
