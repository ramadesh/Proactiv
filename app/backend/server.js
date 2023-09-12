const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserPass = require('./userpass');
const app = express();
const port = 5001;

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

app.post('/userpass', (req, res) => {
  
  const { pass, userId } = req.body; // Assuming the data and userId are sent as properties in the request body
  
  // Create a new instance of the Data model
  const newData = new UserPass({ pass, userId });

  // Save the data to MongoDB
  newData.save()
    .then(savedData => {
      res.status(200).json(savedData); // Return the saved data as the response
    })
    .catch(error => {
      console.error('Failed to save data:', error);
      res.status(500).json({ error: 'Failed to save data' });
    });
});

  
app.get('/userpass', (req, res) => {
  const userId = req.query.userId; // Assuming the userId is sent as a query parameter
  // Retrieve the data entries for the specified userId
  UserPass.find({ userId })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      console.error('Failed to retrieve data:', error);
      res.status(500).json({ error: 'Failed to retrieve data' });
    });
});
  
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port} :)`);
});
