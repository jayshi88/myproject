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
    database: 'testing_db'

});



    connection.connect(function (err) {
        if (err) {
            console.log("error connecting." + err);
        }
    });

    connection.query('SELECT * FROM Name_Systems WHERE Name_Systems.NameID=1', function (err, rows, fields) {
        if (!err) {
            console.log("The solution is: " +rows[0].NameID);
                        
        } else {
            console.log("error while performing query." + err);
        }
    });

// Example for mechanism question study

// Select random mechanism

var mechanismID = 3;



function getQuery(query, callback){
connection.query(query, function (err, rows, fields) {
        if (!err) {
            console.log("The solution is: " +rows[0].Mechanism);            
        } else {
            console.log("error while performing query." + err);
        }

        callback(rows[0].Mechanism);
        //return rows[0].mechanismID;

 

    });
}


globalArray = [];

getQuery('SELECT * FROM mechanisms ORDER BY RAND() LIMIT 1',function(myVar) {console.log("Inside callback: " + myVar); globalArray[0]=myVar;})

//getting the value passed out of the query as a variable so we can use it in another function
getQuery('SELECT * FROM mechanisms ORDER BY RAND() LIMIT 1',function(myVar) {console.log("Inside callback: " + myVar);})

console.log(globalArray[0]);


console.log(mechanismID);

 //   var mechanismName = rows[0].Mechanism;




    connection.end(function(err) {
		
	});


// querying for relationship data 
// for our relationship tables, we may use REFERENCE command to tell sql which columns
// (and these columns are called foreign key) are referencing
// the primary key of another table. 

// for a many to many relationship with 2 tables and 1 relationship table the following can 
// perform a query in one command
//SELECT Table.column, Table.column for the 2 columns we want to see (these 2 will be the 2
// tables that are being joined not the relationship table)
// FROM Table1
// INNER JOIN RelationshipTable
// ON Table.primarykey column name = relationshiptable.foreign key column name
// INNER JOIN Table2
// ON Relationshiptable.foreign key column for table2 = Table2.primary key column name
// WHERE Table1.column of interest - "search of interest";
