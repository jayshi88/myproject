var express = require('express');
var router = express.Router();
// var dbStuff = require('../db/db');
var sqlFile = require('../db/sql_queries_version_1');
var util = require('util');



router.post('/', function (req, res, next) {
    console.log(req.body); //can put req.body.mainSearch etc etc into
    // db queries. 
    //query goes here
    res.send("testing 123");
    //actual desired results end up in the res.send
    //USE INDEX.JS as example
    
});




module.exports = router;