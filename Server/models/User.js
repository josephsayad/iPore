var mongoose = require('mongoose');
var run = require('./PipelineRun');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    default: ''
  },

  password: {
  	type: String,
  	required: true,
  	default: ''
  },

  runs: [run.schema],

  timestamp: {
  	type: Date,
  	default: Date.now
  }
});

userSchema.methods.summary = function() {
  var summary = {
    name: this.name,
    email: this.email,
    runs: this.runs,
    timestamp: this.timestamp,
    id: this._id
  };

  return summary;
};

module.exports = mongoose.model('userSchema', userSchema);
