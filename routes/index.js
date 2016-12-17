var express = require('express');
var router = express.Router();
var dbStuff = require('../db/db');



/* GET home page. */
router.get('/', function(req, res, next) {
  dbStuff.getSingleName(function(data) {
    res.render('index', { title: data });
  });
});

module.exports = router;
