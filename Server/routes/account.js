var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');
var userController = require('../controllers/UserController');

router.post('/:action', function(req, res, next) {
  var action = req.params.action;
  
  if(action == 'login') {

    var loginInfo = req.body; 
    var email = loginInfo.email.toLowerCase();

    console.log(email);

    userController.get({email: email}, true, function(err, result) {
      if(err) { 
        res.json({
          status: 'fail',
          message: err
        });
      }

      else {
        if(result.length == 0) { //  Invalid Email.
          res.json({
            status: 'fail',
            message: 'Invalid Email',
            attemptedLogin: { email: email, password: loginInfo.password }
          });
        }
        
        else { //  Valid Email.
          var accountInfo = result[0];
          var hashFromDB = accountInfo.password;
          var passwordCheck = bcrypt.compareSync(loginInfo.password, hashFromDB);

          if(passwordCheck == false) {
            res.json({
              status: 'fail',
              message: 'Invalid Password'
            })
          }

          else { 
            var accountSummary = accountInfo.summary();
            req.session.user = accountSummary.id;

            res.json({
              status: 'success',
              message: 'loggedIn',
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
      status: 'success',
      message: 'loggedOut'
    });
  }

  if(action == 'currentuser') {
    if(req.session == null || req.session.user == null) {
      res.json({
        status: 'fail',
        message: 'Not logged in'
      });
    }
    
    else {
      var userID = req.session.user;
      
      userController.getByID(userID, false, function(err, result) {
        if(err) {
          res.json({
            status: 'fail',
            message: err.message
          });
        }

        else {
          res.json({
            status: 'success',
            loggedUser: result
          });
        }
      });
    }
  }
});

module.exports = router;
