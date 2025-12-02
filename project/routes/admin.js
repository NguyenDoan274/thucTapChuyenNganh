var express = require('express');
const Employee = require("../models/Employee");
const bcryptjs = require("bcryptjs");
const createError = require("http-errors");
let isLoggedIn=false;
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
     if (isLoggedIn) {
        return res.render('admin/index', {title: 'Admin'}) ;
     }
    return res.render('admin/login', {title: 'login', layout : false}) ;
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
    isLoggedIn=false;
    res.render('admin/login', { title: 'login', layout: false });
});
router.post('/login', (req, res) => {
    Employee.findOne({email: req.body.email}).then((user) => {
        if (user) {
            bcryptjs.compare(req.body.password,user.password,(err,matched)=>{
                if(err) return err;
                if(matched){
                    isLoggedIn=true;
                   return res.render('admin/index', {title: 'Admin'}) ;
                }else {
                   //return res.send("Password is incorrect");
                  return res.render('admin/error', {title: 'Login error', message: 'Password is incorrect' , layout: false} );
                }
            })
        }
        else
        {
           return res.render('admin/error', {title: 'Login error', message: 'Email is invalid' , layout: false} );
        }
    })
});


router.get('/navbar', function(req, res, next) {
    res.render('admin/navbar', {title: 'navbar'}) ;
});

router.get('/register', function(req, res, next) {
    res.render('admin/register', {title: 'register', layout : false}) ;
});

router.post('/register',  (req,res) => {
        const newUser = new Employee();
        newUser.firstName = req.body.firstName;
        newUser.lastName= req.body.lastName;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        var confirmPassword = req.body.confirmPassword;
        if (newUser.password.trim() =="") {
            return  res.render('admin/error', {title: 'Register error', message: 'Password is null',layout: false}) ;
        }
        else if(newUser.password.length < 5) {
            return  res.render('admin/error', {title: 'Register error', message: 'Password needs at least 5 character!',layout: false}) ;
        }
        if (newUser.password != confirmPassword) {
           return  res.render('admin/error', {title: 'Register error', message: 'Password does not match',layout: false}) ;
        }
        bcryptjs.genSalt(10, function (err, salt) {
            bcryptjs.hash(newUser.password, salt, function (err, hash) {
                if (err) {return  err}
                newUser.password = hash;
                newUser.save().then(userSave=>
                {
                  return  res.render('admin/login', {title: 'login',layout: false}) ;
                }).catch(err => {
                   //return res.send();
                    return res.render('admin/error', {title: 'Register error', message: 'USER ERROR'+err,layout: false}) ;
                });
            });
        });
    }
);


router.get('/tables', function(req, res, next) {
    res.render('admin/tables', {title: 'tables'}) ;
});


router.get('/test', function(req, res, next) {
    res.render('admin/test', {title: 'test'}) ;
});
module.exports = router;
