var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/shop', function(req, res, next) {
    res.render('shop');
});

router.get('/about', function(req, res, next) {
    res.render('about');
});

router.get('/blog', function(req, res, next) {
    res.render('blog');
});

router.get('/cart', function(req, res, next) {
    res.render('cart');
});

router.get('/checkout', function(req, res, next) {
    res.render('checkout');
});

router.get('/contact', function(req, res, next) {
    res.render('contact');
});

router.get('/single-post', function(req, res, next) {
    res.render('single-post');
});

router.get('/single-product', function(req, res, next) {
    res.render('single-product');
});
module.exports = router;
