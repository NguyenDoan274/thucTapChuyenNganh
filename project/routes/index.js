var express = require('express');
var router = express.Router();
router.all('/*', function(
    req,
    res,
    next) {
    res.app.locals.layout = 'home';
    next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/index', { title: 'Express' });
});

router.get('/shop', function(req, res, next) {
    res.render('home/shop');
});

router.get('/about', function(req, res, next) {
    res.render('home/about');
});

router.get('/blog', function(req, res, next) {
    res.render('home/blog');
});

router.get('/cart', function(req, res, next) {
    res.render('home/cart');
});

router.get('/checkout', function(req, res, next) {
    res.render('home/checkout');
});

router.get('/contact', function(req, res, next) {
    res.render('home/contact');
});

router.get('/single-post', function(req, res, next) {
    res.render('home/single-post');
});

router.get('/single-product', function(req, res, next) {
    res.render('home/single-product');
});

router.get('/customer', function(req, res, next) {
    res.render('home/customer');
});
module.exports = router;
