var User = require('../models/User');

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
  }
};