var express = require('express');
const Customer = require("../models/Customer");
const bcryptjs = require("bcryptjs");
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
  res.render('home/index', { title: 'home' });
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
router.post('/login', (req, res) => {
    Customer.findOne({email: req.body.username}).then((user) => {
        if (user) {
            bcryptjs.compare(req.body.password,user.password,(err,matched)=>{
                if(err) return err;
                if(matched){
                    return res.render('home/index', {title: 'Admin', message: 'Login successfully'}) ;
                    //return res.send('login success');
                }else {
                    //return res.send("Password is incorrect");
                    return res.render('home/error', {title: 'Login error', message: 'Password is incorrect' } );
                }
            })
        }
        else
        {
            return res.render('home/error', {title: 'Login error', message: 'Email is invalid' } );
        }
    })
});

router.post('/register',  (req,res) => {
        const newUser = new Customer();
        newUser.email = req.body.username;
        newUser.password = req.body.password;
        bcryptjs.genSalt(10, function (err, salt) {
            bcryptjs.hash(newUser.password, salt, function (err, hash) {
                if (err) {return  err}
                newUser.password = hash;
                newUser.save().then(userSave=>
                {
                    //return  res.render('home/index', {title: 'login',layout: false}) ;
                    return  res.render('home/index', {title: 'Home'}) ;
                }).catch(err => {
                    //return res.send();
                    return res.render('home/error', {title: 'Register error', message: 'USER ERROR'+err}) ;
                });
            });
        });
    }
);

module.exports = router;
