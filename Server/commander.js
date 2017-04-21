module.exports = {
  helloWorld: function() {
    var exec = require('child_process').exec, child;

    child = exec('sh ./nanopore/bash/helloWorld.sh', function(error, stdout, stderr) {
      console.log('[Commander] Greetings, world.');

      if(error !== null) {
  	    console.log('exec error: ' + error);
      }
    });
  },

  runPipeline: function(userID, pipelineName, fast5Path, referencePath) {
  	var exec = require('child_process').exec, child;
    var pipelineDetail = userID + ' ' + pipelineName + ' ' + fast5Path + ' ' + referencePath;

    child = exec('sh ./nanopore/bash/runPipeline.sh ' + pipelineDetail, function(error, stdout, stderr) {
      console.log('[Commander] Running nanopore sequencing pipeline with ID ' + pipelineName + '.');
      console.log(stdout)

      if(error !== null) {
  	    console.log('exec error: ' + error);
      }
    });
  }
}
