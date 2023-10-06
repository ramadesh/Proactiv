const mongoose = require('mongoose');
const crypto = require('crypto');

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
  },
  salt: {
    type: String,
    required: true
  }
  
});

// Method to set salt and hash the password for a user 
dataSchema.methods.setPassword = function(password) { 
     
  // Creating a unique salt for a particular user 
  this.salt = crypto.randomBytes(16).toString('hex'); 

  // Hashing user's salt and password with 1000 iterations, 
    
  this.pass = crypto.pbkdf2Sync(password, this.salt,  
  1000, 64, `sha512`).toString(`hex`); 
};

// Method to check the entered password is correct or not 
dataSchema.methods.validPassword = function(password) { 
  var hash = crypto.pbkdf2Sync(password,  
  this.salt, 1000, 64, `sha512`).toString(`hex`); 
  return this.pass === hash; 
};

// Create the model using the schema
module.exports = mongoose.model('UserPass', dataSchema);