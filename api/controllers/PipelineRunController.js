var PipelineRun = require('../models/PipelineRun');

/* Database requests made to the PipelineRun collection
 * is facilitated here. API will route here.
 */

module.exports = {
  get: function(params, isPrivate, callback) {
  	PipelineRun.find(params, function(error, runs) {
      if (error) {
      	if (callback != null) {
          callback(error, null);
      	}
      } 

      else {
      	if (callback != null) {
      	  if (isPrivate) {
            callback(null, runs);
      	  } 

      	  else if (!isPrivate) {
      	    var runSummaries = [];
      	  	
      	  	for (var i = 0; i < runs.length; ++i) {
              var run = runs[i];
              runSummaries.push(run.summary());
      	  	}

      	  	callback(null, runSummaries);
      	  }
      	}
      }
  	});
  },

  getByID: function(id, isPrivate, callback) {
    PipelineRun.findById(id, function(error, run) {
      if (error) {
        if(callback != null) {
          var msg = 'Run with ID ' + id + ' not found.';
          callback({message:msg}, null);
        }
      }

      else {
        if(callback != null) {
          if(isPrivate) {
            callback(null, run);
          }

          else if (!isPrivate) {
            callback(null, run.summary());
          }
        }   
      }
    });
  }
};