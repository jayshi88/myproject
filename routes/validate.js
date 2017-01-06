var express = require('express');
var router = express.Router();
// var dbStuff = require('../db/db');
var sqlFile = require('../db/sql_queries_version_1');
var util = require('util');



function questionAnalyzer(answerList, selectedAnswers) {

    for (var i = 0; i < selectedAnswers.length; i++) {
        var isValidAnswer = false;
        for (var e = 0; e < answerList.length; e++) {

            if (selectedAnswers[i] === answerList[e]) {
                isValidAnswer = true;
            }
        }
        if (isValidAnswer === false) {
            return false;
        }
    }
    return true;
};


// create another function here to analyze if the UNSELECTED choices match with any of the correct answers. 
function unselectedAnalyzer (answerList, unselectedAnswers) {
    for (var i = 0; i < unselectedAnswers.length; i++) {
        var isValidAnswer = false;
        for (var e = 0; e < answerList.length; e++) {
            if (unselectedAnswers[i] === answerList[e]) {
                isValidAnswer = true;
            }
        }
        //something is wrong with this logic, need to console.log specifics
        if (isValidAnswer === false) {
            return false;
        }
    }
    return true;

}


router.post('/', function (req, res, next) {
    sqlFile.validateQueryOutside(function (dataRows) {
        var answerList = [];
        for (var i = 0; i < dataRows.length; i++) {
            answerList.push(dataRows[i].MedName);
        }
console.log(req.body);
       var isValidSelectedAnswers = questionAnalyzer(answerList, req.body["selected[]"]);
       var containsNoAnswers = unselectedAnalyzer(answerList, req.body["unselected[]"]);
console.log(isValidSelectedAnswers, containsNoAnswers);
       var userIsRight = isValidSelectedAnswers && containsNoAnswers;
       var responseObject = {
           printMessage: userIsRight
       };
       res.send(responseObject);

    }, req.body.mainSearch);


    // console.log(req.body); //can put req.body.mainSearch etc etc into
    // db queries. 
    //query goes here

});




module.exports = router;