var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var shopRouter = require('./routes/shop');
var aboutRouter = require('./routes/about');
var blogRouter = require('./routes/blog');
var cartRouter = require('./routes/cart');
var checkoutRouter = require('./routes/checkout');
var contactRouter = require('./routes/contact');
var single_postRouter = require('./routes/single-post');
var single_productRouter = require('./routes/single-product');
var usersRouter = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/shop', shopRouter);
app.use('/about', aboutRouter);
app.use('/blog', blogRouter);
app.use('/cart', cartRouter);
app.use('/checkout', checkoutRouter);
app.use('/contact', contactRouter);
app.use('/single-post',single_postRouter);
app.use('/single-product',single_productRouter);
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
