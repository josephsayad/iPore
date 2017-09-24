module.exports = {
  runPipeline: function(userID, pipelineName, fast5Path, referencePath) {
  	var exec = require('child_process').exec, child;

    /* Trim whitespace before and after pipelineName */

    pipelineNameTrim = pipelineName.replace(/^\s+|\s+$/g, '');

    /* Remove whitespace in the middle of name, replace with underscore */

    if (pipelineNameTrim.indexOf(' ') >= 0) {
      pipelineNameTrim = pipelineNameTrim.split(' ').join('_');
    }

    var pipelineDetail = userID + ' ' + pipelineNameTrim + ' ' + fast5Path + ' ' + referencePath;

    child = exec('sh ./nanopore/bash/runPipeline.sh ' + pipelineDetail, {maxBuffer: 1024 * 700}, function(error, stdout, stderr) {
      console.log('[Commander] Running nanopore sequencing pipeline with ID ' + pipelineNameTrim + ' is complete.');
      // console.log(stdout);

      if(error !== null) {
  	    console.log('exec error: ' + error);
      }
    });
  }
}
