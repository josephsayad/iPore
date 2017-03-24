var express = require('express');
var router = express.Router();

/* Import controllers */

var userController = require('../controllers/UserController');
var pipelineRunController = require('../controllers/PipelineRunController');

/* Plug-in controllers into the API router */

var controllers = {
  user: userController,
  pipelineRun: pipelineRunController
};

/* GET collections of objects from MongoDB */

router.get('/:resource', function(req, res, next) {
  var resource = req.params.resource;
  controller = controllers[resource];

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

/* GET object by ID from MongoDB */

router.get('/:resource/:id', function(req, res, next) {
  var resource = req.params.resource;
  var id = req.params.id;
  controller = controllers[resource];

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

/* GET User by Email from MongoDB */

router.get('/:resource/email/:email', function(req, res, next) {
  var resource = req.params.resource;
  var email = req.params.email;
  controller = controllers[resource];

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

/* POST in MongoDB */

router.post('/:resource', function(req, res, next) {
  var resource = req.params.resource;
  controller = controllers[resource];

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

module.exports = router;
