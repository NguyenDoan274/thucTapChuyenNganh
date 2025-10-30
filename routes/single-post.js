var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/single-post', function(req, res, next) {
    res.render('single-post');
});

module.exports = router;
