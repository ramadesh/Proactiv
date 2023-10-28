const mongoose = require('mongoose');
const crypto = require('crypto');

// Define the schema for your data
const todoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  todo: {
    type: String,
    required: true
  },
  due: {
    type: String,
    required: true
  },
  active: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
});

// Create the model using the schema
module.exports = mongoose.model('ToDo', todoSchema);