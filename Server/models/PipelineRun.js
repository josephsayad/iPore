var mongoose = require('mongoose');

var pipelineRunSchema = new mongoose.Schema({
  pipelineName: {
  	type: String, 
  	required: true,
  	trim: true,
    lowercase: true,
  	default: ''
  },

  fast5Path: {
    type: String, 
    required: true,
    trim: true,
    default: ''
  },

  referencePath: {
    type: String, 
    required: true,
    trim: true,
    default: ''
  },

  status: {
    type: String,
    default: 'incomplete'
  },

  error: {
    type: String,
    default: ''
  },

  output: { 
    type: {} 
  },

  timestamp: {
  	type: Date,
  	default: Date.now
  }
});

pipelineRunSchema.methods.summary = function() {
  var summary = {
    pipelineName: this.pipelineName,
    timestamp: this.timestamp,
    id: this._id
  };

  return summary;
};

module.exports = mongoose.model('pipelineRunSchema', pipelineRunSchema);
