const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserPass = require('./userpass');
const app = express();
const port = 5002;

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


app.post('/userpass', async (req, res) => {
  
  const { pass, userId, email, school, birthday } = req.body;
  
  // Create a new instance of the Data model
  const newData = new UserPass({ pass, userId, email, school, birthday });

  const existingUser = await UserPass.findOne({userId:userId});
  console.log("EXISTING USER", existingUser);
console.log("hi");
  if (!existingUser) {
    // Save the data to MongoDB
    newData.save()
    .then(savedData => {
      res.status(200).json(savedData); // Return the saved data as the response
    })
    .catch(error => {
      console.error('Failed to save data:', error);
      res.status(500).json({ error: 'Failed to save data' });
    });
  } else {
    console.log("Username already exists")
  res.status(404).json({ error: 'Username already taken!' })
  }
});

  
app.get('/userpass', async (req, res) => {
    const { userId, pass } = req.query; // Use req.query to access query parameters
  
    try {
      // Search for a user in the database with the provided userId and pass
      const user = await UserPass.findOne({ userId, pass });
  
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
  });
  
  
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port} :)`);
});
