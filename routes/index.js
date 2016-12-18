var express = require('express');
var router = express.Router();
// var dbStuff = require('../db/db');
var sqlFile = require('../db/sql_queries_version_1');



/* GET home page. */
router.get('/', function(req, res, next) {
  // dbStuff.getSingleName(function(data) {
  //   res.render('index', { title: data });
  // });

  sqlFile.testQueryOutside(function(dataRows) {
      //have the resulting query data in dataRows
      res.render('sql_query_mechanisms', {title: "sup dudes", rows: dataRows});
  });
});

module.exports = router;
