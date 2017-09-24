var dirToJson = require('dir-to-json');
var mongoose = require('mongoose');
var User = require('../../models/User');

var userID = process.argv[2];
var pathToDir = process.argv[3];
var runName = process.argv[4];

dirToJson(pathToDir, function(err, dirTree) {
  if ( err ) {
    throw err;
  } else {

    /* Connect populate.js to MongoDB */

    var api = 'API';
    var mongodbUrl = 'mongodb://localhost/' + api;

    mongoose.connect(mongodbUrl, function(error, response) {
      if (error) {
        console.log('[Populate] ' + error);
      } 
      else {
        console.log('[Populate] Connected to MongoDB');
      }
    });

    /* Get run and update output */

    User.findOneAndUpdate({ "_id": userID, "runs.pipelineName": runName.toLowerCase() },
      { 
        $set: {
          "runs.$.output": dirTree,
          "runs.$.status": "complete"
        }
      },
      
      function(error, user) {
        if(error) { console.log(error); }
        console.log('%j', user);
    });

    /* Close connection with MongoDB */

    mongoose.connection.close();
  }
});
