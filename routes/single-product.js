var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/single-product', function(req, res, next) {
    res.render('single-product');
});

module.exports = router;
