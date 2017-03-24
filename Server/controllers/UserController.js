var User = require('../models/User');
var bcrypt = require('bcryptjs');

/* Database requests made to the User collection
 * is facilitated here. API will route here.
 */

module.exports = {
  get: function(params, isPrivate, callback) {
  	User.find(params, function(error, users) {
      if (error) {
      	if (callback != null) {
          callback(error, null);
      	}
      } 

      else {
      	if (callback != null) {
      	  if (isPrivate) {
            callback(null, users);
      	  } 

      	  else if (!isPrivate) {
      	    var userSummaries = [];
      	  	
      	  	for (var i = 0; i < users.length; ++i) {
              var user = users[i];
              userSummaries.push(user.summary());
      	  	}

      	  	callback(null, userSummaries);
      	  }
      	}
      }
  	});
  },

  getByID: function(id, isPrivate, callback) {
    User.findById(id, function(error, user) {
      if (error) {
        if(callback != null) {
          var msg = 'User with ID ' + id + ' not found.';
          callback({message:msg}, null);
        }
      }

      else {
        if(callback != null) {
          if(isPrivate) {
            callback(null, user);
          }

          else if (!isPrivate) {
            callback(null, user.summary());
          }
        }   
      }
    });
  },

  getByEmail: function(email, isPrivate, callback) {
    User.findOne({email: new RegExp('^'+email+'$', "i")}, function(error, user) {
      if(user === null) {
        if(callback != null) {
          var msg = 'User not found.';
          callback({message:msg}, null);
        }
      }

      else {
        if(callback != null) {
          if(isPrivate) {
            callback(null, user);
          }

          else if (!isPrivate) {
            callback(null, user.summary());
          }
        }            
      }
    });
  },

  post: function(params, callback) {
    
    /* Hashing User Password */

    var password = params['password'];
    var hashedPassword = bcrypt.hashSync(password, 10);
    params['password'] = hashedPassword;

    /* Create user object in MongoDB */

    User.create(params, function(error, newUser) {
      if (error) {
        if (callback != null) {
          callback(error, null);
        }
      }

      else {
        if (callback != null) {
          callback(null, newUser);
        }
      }
    });
  }
};
