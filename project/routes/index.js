var express = require('express');
const Customer = require("../models/Customer");
const bcryptjs = require("bcryptjs");
const passport = require('passport');
const Category = require("../models/Category");
const Product = require("../models/Product");
const Contact = require("../models/Contact");
const LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
router.all('/*',async function(
    req,
    res,
    next) {
    res.app.locals.layout = 'home';
    try {
        const contact = await Contact.findOne({}).lean();
        res.locals.footerContact = contact;
    } catch (err) {
        res.locals.footerContact = null;
    }
    next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
    Category.find({}).then((dbCategory) => {
        categories = dbCategory.map(cat=>cat.toObject());
    Product.find({}).then((dbProduct) => {
        products = dbProduct.map(pro => pro.toObject());
        res.render('home/index', {title: 'home', products: products, categories: categories});
        });
    });
});

router.get('/shop', function(req, res, next) {
    Category.find({}).then((dbCategory) => {
        categories = dbCategory.map(cat=>cat.toObject());
    Product.find({}).then((dbProduct) => {
        products = dbProduct.map(pro=>pro.toObject());
        res.render('home/shop', {products: products,categories:categories});
         });
    });
});

router.get('/about', function(req, res, next) {
    res.render('home/about');
});


router.get('/cart', function(req, res, next) {
    res.render('home/cart');
});

router.get('/checkout', function(req, res, next) {
    res.render('home/checkout');
});

router.get('/contact', function(req, res, next) {
    Contact.find({}).then((dbContact) => {
        contacts = dbContact.map(cat=>cat.toObject());
        res.render('home/contact', {contacts: contacts});
    });
});

router.get('/category', function(req, res, next) {
    Category.find({}).then((dbCategory) => {
        categories = dbCategory.map(cat=>cat.toObject());
        res.render('home/category', { title: 'category', categories: categories});

    });
});

router.get('/single-product/:id', function(req, res, next) {

            Product.findOne({_id: req.params.id}).populate('category').then((product) => {
                Product.find({}).then((dbProduct) => {
                    products = dbProduct.map(pro => pro.toObject());
                res.render('home/single-product', {title: 'edit', product: product.toObject(), products:products});
            });
        });
});


router.get('/category-books/:id', function(req, res, next) {
    Product.find({ category: req.params.id }).populate('category').then((dbProduct) => {
        products = dbProduct.map(pro => pro.toObject());
        Category.find({}).then((dbCategory) => {
            categories = dbCategory.map(cat=>cat.toObject());
        res.render('home/category-books', { title: 'category-books',layout:'home', products:products ,categories:categories });
    });
    });
});


router.get('/login', function(req, res, next) {
    res.render('home/login', { title: 'login'});
});

//APP LOGIN
passport.use('customer-local',new LocalStrategy({usernameField: 'email'}, function (email, password, done) {
    Customer.findOne({email: email}).then(user => {
        if (!user)
            return done(null, false, {message: 'Wrong email!'});

        bcryptjs.compare(password, user.password, (err, matched) => {
            if (err) return err;
            if (matched) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Wrong password'});
            }
        });

    });
}));
router.post('/login', (req, res, next) => {
    let errors = [];
    if (!req.body.email) {
        errors.push({message: 'E-mail is required'});
    }
    if (!req.body.password) {
        errors.push({message: 'Password is required'});
    }
    if (errors.length > 0) {
        res.render('home/login', {
            title: 'Login',
            errors: errors,
            email: req.body.email,
            password: req.body.password,
        });
    } else {
        passport.authenticate('customer-local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    }
});


router.get('/register', function(req, res, next) {
    res.render('home/register', { title: 'register'});
});
router.post('/register', (req, res, next) => {

    let errors = [];
    if (!req.body.firstName) {
        errors.push({message: 'First name is required '});
    }
    if (!req.body.lastName) {
        errors.push({message: 'Last name is required'});
    }
    if (!req.body.email) {
        errors.push({message: 'E-mail is required'});
    }
    if (!req.body.password) {
        errors.push({message: 'Password is required'});
    }
    if(req.body.password != req.body.confirmPassword) {
        errors.push({message: 'Password is not match'});
    }
    if (errors.length > 0) {
        res.render('home/register', {
            title: 'Register',
            errors: errors,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
        });
    } else {
        Customer.findOne({email: req.body.email}).then((user) => {
            if (!user) {
                const newCustomer = new Customer({
                    email: req.body.email,
                    password: req.body.password,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                });
                bcryptjs.genSalt(10, function (err, salt) {
                    bcryptjs.hash(newCustomer.password, salt, (err, hash) => {
                        newCustomer.password = hash;
                        newCustomer.save().then(saveUser => {
                            req.flash('success_message', 'Successfully registered!');
                            res.redirect('/login');//or /login
                        });
                    })
                })
            } else {
                req.flash('error_message', 'E-mail is exist!');
                res.redirect('/login');
            }

        });

    }
});

router.get('/forgot-password', function(req, res, next) {
    res.render('home/forgot-password', {title: 'forgot-password'}) ;
});
router.get('/logout', (req, res) => {
    req.logOut((err) => {
        if (err) {
            return res.status(500).send(err); // Handle the error appropriately
        }
        res.redirect('/'); // Redirect after logout
    });

});
// router.post('/login', (req, res) => {
//     Customer.findOne({email: req.body.username}).then((user) => {
//         if (user) {
//             bcryptjs.compare(req.body.password,user.password,(err,matched)=>{
//                 if(err) return err;
//                 if(matched){
//                     return res.render('home/index', {title: 'Admin', message: 'Login successfully'}) ;
//                     //return res.send('login success');
//                 }else {
//                     //return res.send("Password is incorrect");
//                     return res.render('home/error', {title: 'Login error', message: 'Password is incorrect' } );
//                 }
//             })
//         }
//         else
//         {
//             return res.render('home/error', {title: 'Login error', message: 'Email is invalid' } );
//         }
//     })
// });

// router.post('/register',  (req,res) => {
//         const newUser = new Customer();
//         newUser.email = req.body.username;
//         newUser.password = req.body.password;
//         bcryptjs.genSalt(10, function (err, salt) {
//             bcryptjs.hash(newUser.password, salt, function (err, hash) {
//                 if (err) {return  err}
//                 newUser.password = hash;
//                 newUser.save().then(userSave=>
//                 {
//                     //return  res.render('home/index', {title: 'login',layout: false}) ;
//                     return  res.render('home/index', {title: 'Home'}) ;
//                 }).catch(err => {
//                     //return res.send();
//                     return res.render('home/error', {title: 'Register error', message: 'USER ERROR'+err}) ;
//                 });
//             });
//         });
//     }
// );

module.exports = router;
