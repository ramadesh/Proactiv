const mongoose = require('mongoose');

// Define the schema for your data
const journalPromptSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true
  }
});

// Create the model using the schema
module.exports = mongoose.model('journalprompts', journalPromptSchema);