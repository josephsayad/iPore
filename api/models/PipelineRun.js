var mongoose = require('mongoose');

var pipelineRunSchema = new mongoose.Schema({
  name: {
  	type: String, 
  	required: true,
  	trim: true,
  	default: ''
  },

  state: {
  	type: String,
  	default: 'resting'
  },

  timestamp: {
  	type: Date,
  	default: Date.now
  }
});

pipelineRunSchema.methods.summary = function() {
  var summary = {
    name: this.name,
    state: this.state,
    timestamp: this.timestamp,
    id: this._id
  };

  return summary;
};

module.exports = mongoose.model('pipelineRunSchema', pipelineRunSchema);
