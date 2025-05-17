var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Pages/index', { title: 'Play Cards !!!' });
});

module.exports = router;
