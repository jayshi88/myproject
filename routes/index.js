var express = require('express');
var router = express.Router();
// var dbStuff = require('../db/db');
var sqlFile = require('../db/sql_queries_version_1');
var util = require('util');


function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;

  }

  return array;

}


/* GET home page. */
router.get('/', function (req, res, next) {
  // dbStuff.getSingleName(function(data) {
  //   res.render('index', { title: data });
  // });
  sqlFile.testQueryOutside(function (dataRows) {
    //have the resulting query data in dataRows
    var list = [];
    for (var i = 0; i < dataRows.length; i++) {
      list.push(dataRows[i].NameID);
    }
      console.log(list);
      console.log(dataRows);

    sqlFile.distractQueryOutside(function (dataRows2) {

      var completeList = [];
      for (var i = 0; i < dataRows.length && i < 5; i++) {
        completeList.push(dataRows[i]);
      }
      completeList = completeList.concat(dataRows2);
      console.log("before shuffle: " + util.inspect(completeList));

      completeList = shuffle(completeList);
      console.log("after shuffle: " + util.inspect(completeList))
      res.render('sql_query_mechanisms', {
        title: "testing document",
        listMe: completeList,
        mechName: dataRows[0].Mechanism
      });
    }, list);
    //   res.render('sql_query_mechanisms', { title: "Testing Phase", rows: dataRows });
  });


});

module.exports = router;
