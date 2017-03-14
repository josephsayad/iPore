var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var userController = require('../controllers/UserController');

router.post('/:action', function(req, res, next) {
  var action = req.params.action;
  
  if(action == 'login') {

    //  Bug Fix 1: password attributes in model! Do not 
    //  include trim or required attributes.

    var loginInfo = req.body; 
    var email = loginInfo.email.toLowerCase();

    console.log(email);

    userController.get({email: email}, true, function(err, result) {
      if(err) { 
        res.json({
          confirmation: 'fail',
          message: err
        });
      }

      else {
        if(result.length == 0) { //  Invalid Email.
          var msg = email + ' is not recognized'; 
          
          res.json({
            confirmation: 'fail',
            message: msg
          });
        }
        
        else { //  Valid Email.
          var accountInfo = result[0];
          var hashFromDB = accountInfo.password;
          var passwordCheck = bcrypt.compareSync(loginInfo.password, hashFromDB);

          if(passwordCheck == false) {
            res.json({
              confirmation: 'fail',
              message: 'Invalid Password'
            })
          }

          else { 
            var accountSummary = accountInfo.summary();
            req.session.user = accountSummary.id;

            res.json({
              confirmation: 'success',
              loggedUser: accountSummary
            });
          }
        }
      }
    });
  }
});

router.get('/:action', function(req, res, next) {
  var action = req.params.action;
  
  if(action == 'logout') {
    req.session.reset();  

    res.json({
      confirmation: 'success',
      message: 'User logged out'
    });
  }

  if(action == 'currentuser') {
    if(req.session == null || req.session.user == null) {
      res.json({
        confirmation: 'fail',
        message: 'Not logged in'
      });
    }
    
    else {
      var userID = req.session.user;
      
      userController.getByID(userID, false, function(err, result) {
        if(err) {
          res.json({
            confirmation: 'fail',
            message: err.message
          });
        }

        else {
          res.json({
            confirmation: 'success',
            loggedUser: result
          });
        }
      });
    }
  }
});

module.exports = router;
