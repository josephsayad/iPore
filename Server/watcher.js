var watcher = require('watch');
var dirToJson = require('dir-to-json');

const pathToDir = '/Users/JosephSayad/Desktop/test-dir';
const target = '/last-file.txt';

watcher.createMonitor(pathToDir, function(monitor) {
  monitor.on('created', function (file, stat) {
  	console.log('[Watcher] ' + file);

  	if (file === pathToDir + target) {
  	  console.log('Populate DB!');

  	  dirToJson(pathToDir, function( err, dirTree ) {
        if ( err ) {
          throw err;
        } else {
          console.log(dirTree);
        }
      });
  	}
  });
});
