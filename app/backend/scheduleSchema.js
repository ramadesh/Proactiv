const mongoose = require('mongoose');
const nanoid = require('nanoid');

// Define the schema for your data
const scheduleEventSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true,
    default: () => nanoid(),
    index: { unique: true }
  },
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  details: {
    type: String,
    default: ""
  },
  start: {
    type: String,
    required: true
  },
  end: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
});

// Create the model using the schema
module.exports = mongoose.model('ScheduleEvent', scheduleEventSchema);