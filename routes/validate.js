var express = require('express');
var router = express.Router();
// var dbStuff = require('../db/db');
var sqlFile = require('../db/sql_queries_version_1');
var util = require('util');



function questionAnalyzer(answerList, choosenChoices) {
    var selectedAnswers;
    if (choosenChoices === undefined) {
      return false;
    }
    else if (choosenChoices.constructor !== Array) {
        selectedAnswers = [choosenChoices];
    } else {
        selectedAnswers = choosenChoices;
    }
    // console.log(selectedAnswers);
    for (var i = 0; i < selectedAnswers.length; i++) {
        var isValidAnswer = false;
        for (var e = 0; e < answerList.length; e++) {
            // console.log("?" + selectedAnswers[i] + "?");
            // console.log("!" + answerList[e] + "!");
            
            if (selectedAnswers[i] === answerList[e]) {
                isValidAnswer = true;
                // console.log("selected answers" + isValidAnswer);
                break;
            }

        }
        if (isValidAnswer === false) {
            return false;
        }
    }
    return true;
};


// unselectedAnalyzer takes two arguments: answerList is list of answers generated from query using the choosen mechanism, 
// notChoosenAnswers is a list of names in an array generated based on user selections in drag boxes. 
// output is boolean value of true or false. False if there were no correct answers left in the unselected box. 
// True if there was indeed one or more correct answers that remain in the unselected box.
function unselectedAnalyzer(answerList, notChoosenAnswers) {
    var unselectedAnswers;
    if (notChoosenAnswers === undefined) {
        return false;
    }
    else if (notChoosenAnswers.constructor !== Array) {
        unselectedAnswers = [notChoosenAnswers];
    } else {
        unselectedAnswers = notChoosenAnswers;
    }

    for (var i = 0; i < unselectedAnswers.length; i++) {
        var leftBehindAnswer = false;
        for (var e = 0; e < answerList.length; e++) {

            console.log(unselectedAnswers);
            console.log(answerList);
            if (unselectedAnswers[i] === answerList[e]) {
                leftBehindAnswer = true;
                console.log(leftBehindAnswer);
                break;
            }
        }
         if (leftBehindAnswer === true) {
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