var http = require('http');
var server = http.createServer();
var fs = require('fs');
var express = require('express');
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection ( {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'database',
    database: 'mednode'

});

// user identifies area of concentration and topic,
// this will be done via a selection on the html side
// here we will need nodejs code for a mySQL query for list of all
// medications associated with selection of user
// the results we get can be parsed as JSON

connection.connect();

    connection.query('SELECT * FROM Name_Systems WHERE Name_Systems.NameID=1', function (err, rows, fields) {
        if (!err) {
            console.log("The solution is: " +rows[0].medName);
            var outputJSON = [];
            for row in rows {
                outputJSON.push(row);
            }
            return outputJSON.toJSON();
                       
        } else {
            console.log("error while performing query.");
        }
    });

    connection.end(function(err) {
		
	});

// now that the system has returned the data we asked for in array format
// we can parse/loop through JSON object list

for (var i = 0; i<rows.length; i++) {
    console.log(rows[i].medName)
}

// each medicaiton has a position in the array and we need to do 2 things
// first, we need to count the total number of results we have received

var possibleAnswers = outputJSON.medName.length;

// second we need to generate random number whole number integers from the number of
// results we received. possibleAnswers represents the total number of possible 
// answer choices and math.floor help us find a whole number between 0-# of results


// we will run this array to avoid repeating the same random number twice
// pick any number within the array and set it to notThis when running the
// makeRandoms function


//INSIDE sql command there is order by random and select top (whatever number of top results you want)
function makeRandoms(notThis) {
    var randoms = [0,1,2,3];

    function removeArrayItem(i) {
        var val = randoms.pop();
        if (i <randoms.length) {
            randoms[i] = val;
        }

    }
    
    function makeRandom() {
        var rand = randoms[Math.floor(Math.random()*randoms.length)];
        removeArrayItem(rand);
        return rand;

    }

    if (notThis <randoms.length) {
        removeArrayItem(notThis);

    }
    
    return { r1: makerandom(), r2: makeRandom()};
}


// randomPick will then pick 4 random numbers
var pickedAnswer = JSON[randoms].medName;


//
