var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');

var config = {
  user: 'ypaulsussman',
  database: 'kepd',
  password: '',
  //do you need host: 'localhost'  here? or is it covered by requiring the 'connection' above?
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000
};

//this initializes a connection pool
var pool = new pg.Pool(config);

router.get('/', function(req, res) {
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      console.log('error connecting: ', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      db.query('SELECT * from "items" ORDER BY "id" DESC;',
      function(queryError, result) {
        done();
        if (queryError) {
          console.log('error querying: ', queryError);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});

module.exports = router;
//who calls this module?
