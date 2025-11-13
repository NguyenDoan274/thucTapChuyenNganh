var express = require('express');
var router = express.Router();
router.all('/*', function(
    req,
    res,
    next) {
    res.app.locals.layout = 'admin';
    next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin/index', {title: 'Admin'}) ;
});

router.get('/category', function(req, res, next) {
    res.render('admin/category/category-list', {title: 'Category'}) ;
});

router.get('/product', function(req, res, next) {
    res.render('admin/product/product-list', {title: 'product'}) ;
});

router.get('/cards', function(req, res, next) {
    res.render('admin/cards', {title: 'cards'}) ;
});

router.get('/blank', function(req, res, next) {
    res.render('admin/blank', {title: 'blank'}) ;
});

router.get('/charts', function(req, res, next) {
    res.render('admin/charts', {title: 'charts'}) ;
});

router.get('/forgot-password', function(req, res, next) {
    res.render('admin/forgot-password', {title: 'forgot-password', layout : false}) ;
});

router.get('/login', function(req, res, next) {
    res.render('admin/login', {title: 'login', layout : false}) ;
});

router.get('/navbar', function(req, res, next) {
    res.render('admin/navbar', {title: 'navbar'}) ;
});

router.get('/register', function(req, res, next) {
    res.render('admin/register', {title: 'register', layout : false}) ;
});

router.get('/tables', function(req, res, next) {
    res.render('admin/tables', {title: 'tables'}) ;
});


router.get('/test', function(req, res, next) {
    res.render('admin/test', {title: 'test'}) ;
});
module.exports = router;
