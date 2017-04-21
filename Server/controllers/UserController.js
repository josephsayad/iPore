var User = require('../models/User');
var run = require('../models/PipelineRun');
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
      if (error || user === null) { // Fix for user id is run id 
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
  },

  getUserRuns: function(id, callback) {
    User.findById(id, 'runs', function(error, runs) {
      if (error || runs === null) {
        if(callback != null) {
          var msg = 'User with ID ' + id + ' not found.';
          callback({message:msg}, null);
        }
      }

      else {
        if(callback != null) {
          callback(null, runs);
        }   
      }
    }); /* Queries User by ID and gets */

  },

  getUserRunByName: function(id, name, callback) {
    User.findById(id, function (error, user) {
      if (error) {
        if(callback != null) {
          var msg = 'Find By ID error.';
          callback({message:msg}, null);
        }
      }
  
      else {

        if (user.runs.length === 0) {        
          var msg = 'Run does not exist.';
          callback(null, {message:msg});
        } else {

          for (var i = 0; i < user.runs.length; ++i) {
            if (user.runs[i].pipelineName === name) {
              if(callback != null) {
                return callback(null, user.runs[i]);
              } 
            }
          }
        
          var msg = 'Run does not exist.';
          return callback(null, {message:msg});
        }
      }
    })
  },

  postUserRun: function(params, id, callback) {
    User.findById(id, 'runs', function(error, user) {
      if (error) {
        if(callback != null) {
          var msg = 'User with ID ' + id + ' not found.';
          callback({message:msg}, null);
        }
      } 

      else {
        if(callback != null) {
          var runInstance = new run({ 
            pipelineName: params['pipelineName'], 
            fast5Path: params['fast5Path'],
            referencePath: params['referencePath']
          }); /* Create and instantiate instance */

          user.runs.push(runInstance);

          user.save(function (error) {
            if(error) {
              console.error('ERROR!');
            }
          });

          callback(null, user);
        }   
      } /* Queries User by ID and posts run */
    });
  }
};
