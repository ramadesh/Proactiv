const { expressjwt: expressJwt } = require('express-jwt');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const jwt = require('jsonwebtoken');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserPass = require('./userpass');
const app = express();
const port = 5002;
const sgMail = require('@sendgrid/mail');
const shortid = require('shortid');

app.use(cors());
app.use(express.json());

app.get('/', async(req, res) => {
    res.status(200).send({
        message: "get request!"
    })
});

// Connect to MongoDB
mongoose.connect("mongodb+srv://pro:cs408@proactiv.br6uph5.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Parse JSON bodies
app.use(bodyParser.json());

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Replace with your client's URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

function checkIfAuthenticated(req, res, next) {
  const token = req.headers['authorization'];
  try {
    const decode = jwt.verify(token, 'secret');
    next();
  } catch(error) {
    console.log(error.message);
    res.status(401).json({ error: 'User not authorized' });
  }
}

app.post('/userpass', async (req, res) => {
  
  // Create a new instance of the Data model
  let newUser = new UserPass();
  newUser.displayName = req.body.displayName;
  newUser.userId = req.body.userId;
  newUser.email = req.body.email;
  newUser.birthday = req.body.birthday;
  newUser.token = shortid.generate();
  newUser.secQ = req.body.secQ;
  newUser.setPassword(req.body.pass);

  await UserPass.findOne({ userId:newUser.userId }).then((data) => {
    if (data == null) {
      // Save the data to MongoDB
      newUser.save().then(savedData => {
        res.status(200).json(savedData); // Return the saved data as the response

        sgMail.setApiKey("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");
        const msg = {
          to: newUser.email,
          from: 'proactivapp2023@gmail.com',
          subject: 'Verify your Proactiv account!',
          text: 'Here is your unique token: ' + newUser.token + '\nPaste this onto the Proactiv Web app.',
        };
        sgMail.send(msg);

      })
      .catch(error => {
        console.error('Failed to save data:', error);
        res.status(500).json({ error: 'Failed to save data' });
      });
    } else {
      console.log("Username already exists")
      res.status(404).json({ error: 'Username already taken!' })
    }
  }).catch((error) => {
    console.error('Error registering new user:', error);
    res.status(500).json({ error: 'Failed to register user data' });
  });
});

app.route('/userpass')
    .get(checkIfAuthenticated, getUser);
  async function getUser(req, res) {
    const { userId, pass } = req.query; // Use req.query to access query parameters
  
    try {
      // Search for a user in the database with the provided userId and pass
      const user = await UserPass.findOne({ userId, pass , deleted: false});
  
      if (!user) {
        // If no matching user is found, return a 404 status code
        return res.status(404).json({ message: 'Incorrect username or password' });
      }
  
      // If a matching user is found, return the user data
      res.status(200).json(user);
    } catch (error) {
      console.error('Error searching for user:', error);
      res.status(500).json({ error: 'Failed to retrieve user data' });
    }
  };

  app.post('/userpass/login', async (req, res) => {
    const { userId, pass } = req.body;
  
    // Search for a user in the database with the provided userId and pass
    await UserPass.findOne({ userId, deleted: false}).then((data) => {
      if (data == null) {
        // If no matching user is found, return a 404 status code
        return res.status(404).json({ message: 'Incorrect username or password' });
      }

      let user = new UserPass();
      user.pass = data._doc.pass;
      user.salt = data._doc.salt;
      if (user.validPassword(req.body.pass)) { 
        const jwtBearerToken = jwt.sign(userId, 'secret');
        // If a matching user is found, return the user data
        return res.status(200).json({
          idToken: jwtBearerToken, 
          expiresIn: 120
        });
      } 

      return res.status(400).send({ 
          message : 'Incorrect username or password'
      }); 
      
    }).catch((error) => {
      console.error('Error searching for user:', error);
      res.status(500).json({ error: 'Failed to retrieve user data' });
    });
  });

app.route('/profile')
  .get(checkIfAuthenticated, getProfile);
async function getProfile(req, res) {
  const { userId } = req.query;
  try {
    const user = await UserPass.findOne({ userId , deleted: false});
    if (!user) {
      // If no matching user is found, return a 404 status code
      return res.status(404).json({ message: 'Username not found' });
    }
    // If a matching user is found, return the user data
    console.log('User found: ' + user);
    user.pass = '';
    res.status(200).json(user);
  } catch (error) {
    console.error('Error searching for user:', error);
    res.status(500).json({ error: 'Failed to retrieve profile data' });
  }
}

app.route('/profile')
  .put(checkIfAuthenticated, updateProfile);
async function updateProfile(req, res) {
  let { displayName, pass, userId, email, birthday } = req.body;
  const updatedProfile = { displayName: displayName, pass : pass, userId : userId, email: email, birthday: birthday };
  const filter = { userId : userId , deleted: false};

  await UserPass.findOneAndUpdate(filter, updatedProfile, { new : true }).then((data) => {
    if(data === null){
      // If no matching profile is found, return a 404 status code
      console.log('Error: profile not found');
      return res.status(404).json({ message: 'Error: profile not found' });
    }
    // If a matching profile is found, return the profile data
    console.log(data._doc);
    res.status(200).json(data._doc);
  }).catch((error) => {
    console.error('Error updating the profile:', error);
    res.status(500).json({ error: 'Failed to update profile data' });
  });
}

app.route('/profile/delete')
  .put(checkIfAuthenticated, deleteProfile);
async function deleteProfile(req, res) {
  let { userId } = req.body;
  const updatedProfile = { userId : userId, deleted : true };
  const filter = { userId : userId };

  await UserPass.findOneAndUpdate(filter, updatedProfile, { new : true , strict: false }).then((data) => {
    if(data === null){
      // If no matching profile is found, return a 404 status code
      console.log('Error: profile not found for profile deletion');
      return res.status(404).json({ message: 'Error: profile not found for profile deletion' });
    }
    // If a matching profile is found, return the profile data
    console.log(data._doc);
    res.status(200).json({ message: 'Profile successfully deleted' });
  }).catch((error) => {
    console.error('Error deleting the profile:', error);
    res.status(500).json({ error: 'Failed to delete profile' });
  });
}

app.put('/profile/verifySecQ', async (req, res) => {
  const { userId, secQ } = req.body;

  await UserPass.findOne({ userId, secQ, deleted: false}).then((data) => {
    if (data == null) {
      // If no matching user is found, return false
      res.status(200).json(false);
    } else {
      // If a matching user is found, return true
      res.status(200).json(true);
    }
  }).catch((error) => {
    console.error('Error verifying answer to security question:', error);
    res.status(500).json({ error: 'Failed to verify answer to security question' });
  });
});

app.put('/profile/resetPass', async (req, res) => {
  let newUser = new UserPass();
  newUser.userId = req.body.userId;
  newUser.setPassword(req.body.pass);
  const updatedProfile = { salt: newUser.salt, pass: newUser.pass };
  const filter = { userId : newUser.userId , deleted: false};

  await UserPass.findOneAndUpdate(filter, updatedProfile, { new : true }).then((data) => {
    if(data === null){
      // If no matching profile is found, return a 404 status code
      console.log('Error: profile not found for resetting password');
      return res.status(404).json(false);
    }

    console.log(data._doc);
    res.status(200).json(true);
  }).catch((error) => {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port} :)`);
});