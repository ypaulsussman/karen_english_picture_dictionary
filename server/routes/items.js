var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');

var config = {
  user: 'ypaulsussman',
  database: 'kepd',
  password: '',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

router.get('/', function(req, res) {
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else {
      db.query('SELECT * from "items" ORDER BY "id" DESC;',
      function(queryError, result) {
        done();
        if (queryError) {
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});//end router.get

router.post('/add', function(req, res) {
  var itemTheme = req.body.itemTheme;
  var itemURL = req.body.itemURL;
  var itemEN = req.body.itemEN;
  var itemKN = req.body.itemKN;
  var itemPron = req.body.itemPron;
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else {
      db.query('INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ($1,$2,$3,$4,$5);', //--> $1 b/c NOT zero-indexed; $1 refers to "author" in the line below
      [itemTheme, itemURL, itemEN, itemKN, itemPron],
      function(queryError, result) {
        done();
        if (queryError) {
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});//end router.post

router.put('/update', function(req, res) {
  var itemTheme = req.body.itemTheme;
  var itemURL = req.body.itemURL;
  var itemEN = req.body.itemEN;
  var itemKN = req.body.itemKN;
  var itemPron = req.body.itemPron;
  var itemID = req.body.id;
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else {
      db.query('UPDATE "items" SET "item_theme"=$1, "item_prompt"=$2, "item_answer_en"=$3, "item_answer_kn"=$4, "item_answer_phon_kn"=$5 WHERE "id" = $6;',
      [itemTheme, itemURL, itemEN, itemKN, itemPron, itemID],
      function(queryError, result) {
        done();
        if (queryError) {
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});//end router.put

router.delete('/delete/:id', function(req, res) {
  var itemID = req.params.id;
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else {
      db.query('DELETE FROM "items" WHERE "id" = $1;',
      [itemID],
      function(queryError, result) {
        done();
        if (queryError) {
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});//end router.delete

router.get('/themed/:id', function(req, res) {
  var themeID = req.params.id;
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      console.log('error connecting: ', errorConnectingToDb);
      res.sendStatus(500);
    } else {
      db.query('SELECT * from "items" WHERE "item_theme" = $1;',
      [themeID],
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
});//end router.get



module.exports = router;
