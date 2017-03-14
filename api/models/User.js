var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    default: ''
  },

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

  timestamp: {
  	type: Date,
  	default: Date.now
  }
});

userSchema.methods.summary = function() {
  var summary = {
    name: this.name,
    email: this.email,
    timestamp: this.timestamp,
    id: this._id
  };

  return summary;
};

module.exports = mongoose.model('userSchema', userSchema);
