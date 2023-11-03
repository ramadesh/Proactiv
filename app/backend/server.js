const { expressjwt: expressJwt } = require('express-jwt');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const jwt = require('jsonwebtoken');
const fs = require('fs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { checkIfAuthenticated } = require('./checkAuthentication.js');

const UserPass = require('./userpass');
const port = 5002;
const sgMail = require('@sendgrid/mail');
const shortid = require('shortid');
const ToDo = require('./todo');
const JournalEntry = require('./journalEntry');
const JournalPrompt = require('./journalPrompt')
var notes = require('./notes.js');
var schedule = require('./scheduleRouter.js');

app.use(cors());
app.use(express.json());
app.use('/note', notes);
app.use('/schedule', schedule);


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
      const user = await UserPass.findOne({ userId, pass, deleted: false});
  
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

  app.post('/todo', async (req, res) => {
    const { userId, todo, due, active } = req.body;
    const newTodo = new ToDo({ userId, todo, due, active });
    try {
      const savedTodo = await newTodo.save();
      res.status(201).json(savedTodo);
    } catch (error) {
      console.error('Error saving post:', error);
      res.status(500).send('Error saving post');
    }
  });
  app.patch('/todo/:id', async (req, res) => {
    const id = req.query.id;
    console.log(id);
    try {
        const updatedTodo = await ToDo.findByIdAndUpdate(
            id,
            { $set: { active: 0 } }, // Use the $set operator to update the "active" field
            { new: true } // This option returns the updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: 'ToDo not found' });
        }

        res.json(updatedTodo);
    } catch (error) {
        console.error('Error updating ToDo:', error);
        res.status(500).send('Error updating ToDo: ' + error.message); // Log the error message
    }
});


  app.get('/todo', (req, res) => {
    const userId = req.query.userId; // Assuming the userId is sent as a query parameter
    const due = req.query.due;
    
    let query = { userId };

    if (due) {
      query.due = due;
    }

  ToDo.find(query)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(error => {
        console.error('Failed to retrieve todos:', error);
        res.status(500).json({ error: 'Failed to retrieve todos' });
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
  let updatedProfile = { };
  if(req.body.pass != null && req.body.pass.length != 0) {
    let newUser = new UserPass();
    newUser.setPassword(req.body.pass);
    updatedProfile = { displayName: displayName, salt: newUser.salt, pass : newUser.pass, email: email, birthday: birthday };
  } else {
    updatedProfile = { displayName: displayName, email: email, birthday: birthday };
  }
  
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

app.post('/JournalEntry', async (req, res) => {
  // console.log("CAN YOU HEAR MEEEE");
  const { userId, title, content} = req.body;
  const newJournalEntry = new JournalEntry({ userId, title, content });
  try {
    console.log('saved successfully')
    const savedJournalEntry = await newJournalEntry.save();
    res.status(201).json(savedJournalEntry);
  } catch (error) {
    console.error('Error saving entry:', error);
    res.status(500).send('Error saving entry');
  }
});

app.get('/JournalEntry', (req, res) => {
  // console.log(req.query)
  const user = req.query.userId; // Assuming the userId is sent as a query parameter

  JournalEntry.find({ userId:user })
    .sort({ active: 1 }) // Sort the data in descending order based on timestamp
    .then(data => {
      // console.log("sending: ", data, "for user: ", user)
      res.status(200).json(data);
    })
    .catch(error => {
      console.error('Failed to retrieve entries:', error);
      res.status(500).json({ error: 'Failed to retrieve entries' });
    });
});

app.put('/JournalEntry', (req, res) => {
  const { userId, title, content} = req.body;  
  const filter = { userId: userId, title: title };
  console.log(filter)
  const update = { content: content };
  JournalEntry.findOneAndUpdate(filter, update)
    .then(data => {
      console.log("Succeeded in updating entry");
      console.log(data)
    })
    .catch(error => {
      console.error('Failed to retrieve entries:', error);
      res.status(500).json({ error: 'Failed to retrieve entries' });
    });
});

app.delete('/JournalEntry', (req, res) => {
  // console.log(req.query)
  const { userId, title} = req.query;  
  const filter = { userId: userId, title: title };
  // console.log(filter)
  JournalEntry.deleteOne(filter)
    .then(data => {
      console.log("Succeeded in deleting entry");
    })
    .catch(error => {
      console.error('Failed to retrieve entries:', error);
      res.status(500).json({ error: 'Failed to retrieve entries' });
    });
});
app.get('/JournalPrompt', (req, res) => {
  // console.log(filter)
  var random = Math.floor(Math.random() * 50)
  JournalPrompt.findOne().skip(random)
    .then(data => {
      console.log("sending: ", data)
      res.status(200).json(data);
    })
    .catch(error => {
      console.error('Failed to retrieve entries:', error);
      res.status(500).json({ error: 'Failed to retrieve entries' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port} :)`);
});