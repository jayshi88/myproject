var express = require('express');
var router = express.Router();
// var dbStuff = require('../db/db');
var sqlFile = require('../db/sql_queries_version_1');



/* GET home page. */
router.get('/', function (req, res, next) {
  // dbStuff.getSingleName(function(data) {
  //   res.render('index', { title: data });
  // });

  sqlFile.testQueryOutside(function (dataRows) {
    //have the resulting query data in dataRows
    var list = [];
    for (var i=0; i<dataRows.length; i++) {
      list.push(dataRows[i].NameID);
    }
    
    sqlFile.distractQueryOutside(function (dataRows2) {
      res.render('sql_query_mechanisms', { title: "testing document", rows2: dataRows2, rows1: dataRows });
    }, list);
 //   res.render('sql_query_mechanisms', { title: "Testing Phase", rows: dataRows });
  });


});

module.exports = router;
