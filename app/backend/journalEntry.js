const mongoose = require('mongoose');

// Define the schema for your data
const journalSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  active: {
    type: Number,
    default: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
});

// Create the model using the schema
module.exports = mongoose.model('JournalEntry', journalSchema);