var http = require('http');
var server = http.createServer();
var fs = require('fs');
var express = require('express');
var app = express();
var util = require('util');
var mysql = require('mysql');
var connection = mysql.createConnection ( {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'database',
    database: 'testing_db'

});

var testQuery = function(webRespondFunc) {

    // connection.connect(function (err) {
    //     if (err) {
    //         console.log("error connecting." + err);
    //     }
    // });

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
            console.log("The solution is: " +util.inspect(rows));
            webRespondFunc(rows);
        } else {
            console.log("error while performing query." + err);
        }
       
    });

     //connection.end();
}

module.exports = {
    testQueryOutside: testQuery
}