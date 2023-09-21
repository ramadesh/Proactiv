const mongoose = require('mongoose');

// Define the schema for your data
const dataSchema = new mongoose.Schema({
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
  school: {
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
  }
});

// Create the model using the schema
module.exports = mongoose.model('UserPass', dataSchema);