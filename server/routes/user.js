var express = require('express');
var router = express.Router();
var passport = require('passport');

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
    if(req.isAuthenticated()) {
        // send back user object from database
        res.send(req.user);
    } else {
        res.send(false);
    }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  console.log('Logged out');
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});


module.exports = router;
