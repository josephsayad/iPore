var express = require('express');
var router = express.Router();

// Set mergeParams: true on childRouter to access params
// from the parent. Nest routers by attaching them as middleware:
var childRouter = express.Router({ mergeParams: true });
router.use('/:resource/:id/run', childRouter);

/* Import controllers */

var userController = require('../controllers/UserController');
var pipelineRunController = require('../controllers/PipelineRunController');

/* Plug-in controllers into the API router */

var parentControllers = {
  user: userController
};

var childControllers = {
  run: pipelineRunController
}

/***************************
 * Parent Routing **********
 ***************************
 */

/* GET */

router.get('/:resource', function(req, res, next) {
  var resource = req.params.resource;
  controller = parentControllers[resource];

  if(controller == null) {
  	res.json({
  	  status: 'fail',
  	  message: 'Invalid resource'
  	})
  }

  else {
  	controller.get(req.query, false, function(error, results) {
  	  if(error) {
        res.json({
          status: 'fail',
          message: error
        });
  	  }

  	  else {
        res.json({
          status: 'success',
          results: results
        });
  	  }
  	});
  }
});

/* GET by ID */

router.get('/:resource/:id', function(req, res, next) {
  var resource = req.params.resource;
  var id = req.params.id;
  controller = parentControllers[resource];

  if(controller == null) {
    res.json({
      status: 'fail',
      message: 'Invalid resource'
    })
  }

  else {
    controller.getByID(id, false, function(error, result) {
      if (error) {
        res.json({
          status: 'fail',
          message: error.message
        });
      }

      else {
        res.json({
          status: 'success',
          result: result
        });
      }
    });
  }
});

/* GET by Email */

router.get('/:resource/email/:email', function(req, res, next) {
  var resource = req.params.resource;
  var email = req.params.email;
  controller = parentControllers[resource];

  if(controller !== userController) {
    res.json({
      status: 'fail',
      message: 'Invalid resource'
    })
  }

  controller.getByEmail(email, false, function(error, result) {
    if (error) {
      res.json({
        status: 'fail',
        message: error.message
      });
    }

    else {
      res.json({
        status: 'success',
        result: result
      });
    }
  });
});

/* GET by Pipeline Name */

// router.get('/:resource/name/:pipelineName', function(req, res, next) {
//   var resource = req.params.resource;
//   var pipelineName = req.params.pipelineName;
//   controller = parentControllers[resource];

//   if(controller !== pipelineRunController) {
//     res.json({
//       status: 'fail',
//       message: 'Invalid resource'
//     })
//   }

//   controller.getByName(pipelineName, false, function(error, result) {
//     if (error) {
//       res.json({
//         status: 'fail',
//         message: error.message
//       });
//     }

//     else {
//       res.json({
//         status: 'success',
//         result: result
//       });
//     }
//   });
// });

/* POST */

router.post('/:resource', function(req, res, next) {
  var resource = req.params.resource;
  controller = parentControllers[resource];

  if(controller == null) {
    res.json({
      status: 'fail',
      message: 'Invalid resource'
    })
  }

  else {
    controller.post(req.body, function(error, result) {
      if (error) {
        res.json({
          status: 'fail',
          message: error.message
        });
      }

      else {
        res.json({
          status: 'success',
          result: result
        });
      }
    });
  }
});

/***************************
 * Child Routing ***********
 ***************************
 */

/* GET children */

childRouter.get('/', function(req, res, next) {
  var resource = req.params.resource;
  var id = req.params.id;
  parentController = parentControllers[resource];

  if(parentController !== userController) {
    res.json({
      status: 'fail',
      message: 'Invalid resource'
    })
  }

  else {
    parentController.getUserRuns(id, function(error, results) {
      if (error) {
        res.json({
          status: 'fail', 
          message: error.message
        });        
      }

      else {
        res.json({
          status: 'success', 
          results: results
        });       
      } 
    });
  }
});

/* GET child by name */

childRouter.get('/:name', function(req, res, next) {
  var resource = req.params.resource;
  var id = req.params.id;
  var name = req.params.name;
  parentController = parentControllers[resource];

  if(parentController !== userController) {
    res.json({
      status: 'fail',
      message: 'Invalid resource'
    })
  }

  else {
    parentController.getUserRunByName(id, name, function(error, result) {
      if (error) {
        res.json({
          status: 'fail', 
          message: error.message
        });        
      }

      else {
        res.json({
          status: 'success', 
          result: result
        });       
      } 
    });
  }
});

/* POST children */

childRouter.post('/', function(req, res, next) {
  var resource = req.params.resource;
  var id = req.params.id;
  parentController = parentControllers[resource];

  if(parentController !== userController) {
    res.json({
      status: 'fail',
      message: 'Invalid resource'
    })
  }
  
  else {
    parentController.postUserRun(req.body, id, function(error, result) {
      if (error) {
        res.json({
          status: 'fail', 
          message: error.message
        });        
      }

      else {
        res.json({
          status: 'success', 
          result: result
        });       
      } 
    });
  }  
});

module.exports = router;
