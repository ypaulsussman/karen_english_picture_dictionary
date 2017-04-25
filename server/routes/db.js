var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');

var config = {
  user: 'ypaulsussman',
  database: 'kepd',
  password: '',
  //do you need host: 'localhost'  here? or is it covered by requiring the
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000
};

//this initializes a connection pool
var pool = new pg.Pool(config);



module.exports = router;
//who calls this module?
