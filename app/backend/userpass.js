const mongoose = require('mongoose');

// Define the schema for your data
const dataSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  birthday: {
    type: String,
    required: true
  }, 
  timestamp: {
    type: Date,
    default: Date.now
  },
  token: {
    type: String
  },
  deleted: {
    type: Boolean,
    default: false
  }, 
  secQ: {
    type: String,
    required: true
  }
  
});

// Create the model using the schema
module.exports = mongoose.model('UserPass', dataSchema);