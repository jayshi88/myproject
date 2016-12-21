var http = require('http');
var server = http.createServer();
var fs = require('fs');
var express = require('express');
var app = express();
var util = require('util');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'database',
    database: 'testing_db'

});

//testQuery is the variable that represents the function we have created
//to make a query to the database to find out answers to our question
var testQuery = function (webRespondFunc) {
    
    connection.query(`SELECT n.NameID, n.MedName, innerQueryResultTable.Mechanism
                    FROM namez n
                    INNER JOIN name_mechanism nm
                    ON n.NameID = nm.NameID
                    INNER JOIN 
                    (SELECT m.MechanismID, m.Mechanism
                    FROM mechanisms m
                    ORDER BY RAND()
                    LIMIT 1) innerQueryResultTable ON innerQueryResultTable.MechanismID=nm.MechanismID`,
        function (err, rows, fields) {
            if (!err) {
                //nodejs print object using module of "util"-built in nodejs package
                console.log("The solution is: " + util.inspect(rows));
                webRespondFunc(rows);
            } else {
                console.log("error while performing query." + err);
            }

        });

}

// distractQuery is the function that houses our queries that specifies a list of
// distraction choices that were not previously displayed in the testQuery

var distractQuery = function (webDistractFunc, nameIDSubstractList) {

    var newThing = `SELECT n.MedName, n.NameID
                  FROM namez n
                  WHERE n.NameID
                  NOT IN (`+ nameIDSubstractList.join(", ") + `)
                  ORDER BY RAND()
                  LIMIT 5;`;
    console.log(newThing);

    connection.query(newThing, function (err, rows, fields) {
        if (!err) {
            //nodejs print object using module of "util"-built in nodejs package
            console.log("Answer be: " + util.inspect(rows));
            webDistractFunc(rows);
        } else {
            console.log("error while performing query." + err);
        }

    });

}

module.exports = {
    testQueryOutside: testQuery,
    distractQueryOutside: distractQuery
}