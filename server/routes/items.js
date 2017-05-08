var express = require('express');
var router = express.Router();
var pg = require('pg');
var pool = require('../modules/db');

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
      db.query('INSERT INTO "items" ("item_theme", "item_prompt", "item_answer_en", "item_answer_kn", "item_answer_phon_kn") VALUES ($1,$2,$3,$4,$5);',
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

router.get('/themed/:id/:user', function(req, res) {
  var themeID = req.params.id;
  var userID = parseInt(req.params.user, 10);
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else if (themeID === 'list') {
      db.query('SELECT * from "items" JOIN "study_list" ON "items".id = "study_list"."item_id" WHERE "user_id" = $1;',
      [userID],
      function(queryError, result) {
        done();
        if (queryError) {
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    } else {
      db.query('SELECT * from "items" WHERE "item_theme" = $1;',
      [themeID],
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

router.post('/add_study', function(req, res) {
  var userID = req.body.userID;
  var itemID = req.body.itemID;
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else {
      db.query('INSERT INTO "study_list" ("user_id", "item_id") VALUES ($1,$2);',
      [userID, itemID],
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

router.delete('/delete_study/:id', function(req, res) {
  var itemID = req.params.id;
  pool.connect(function(errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      res.sendStatus(500);
    } else {
      db.query('DELETE FROM "study_list" WHERE "id" = $1;',
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

module.exports = router;
