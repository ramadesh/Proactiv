var express = require('express');
var router = express.Router();

const UserPass = require('./userpass');
const { checkIfAuthenticated } = require('./checkAuthentication.js');


router.get('/', checkIfAuthenticated, async function(req, res){
    const { userId } = req.query;
    const filter = { userId : userId, deleted: false};
    const projection = { "darkMode" : 1 };
    await UserPass.findOne(filter, projection).then((data) => {
        if(data === null){
            // If no matching user is found, return a 404 status code
            console.log('Error: user not found');
            return res.status(404).json({ message: 'Error: user not found' });
        }
        // If a matching user is found, return dark mode status
        console.log("Dark Mode: " + data._doc.darkMode);
        res.status(200).json(data._doc.darkMode);
    }).catch((error) => {
        console.error('Error getting dark mode status:', error);
        res.status(500).json({ error: 'Failed to get dark mode status' });
    });
 });

router.put('/', checkIfAuthenticated, async function(req, res){
  let { userId, darkMode } = req.body;
  const filter = { userId : userId, deleted: false};

  await UserPass.findOneAndUpdate(filter, { darkMode : darkMode }, { new : true }).then((data) => {
      if(data === null){
        // If no matching user is found, return a 404 status code
        console.log('Error: user not found');
        return res.status(404).json({ message: 'Error: user not found' });
      }
      // If a matching user is found, return new dark mode status
      console.log("Dark Mode: " + data._doc.darkMode);
      res.status(200).json(data._doc.darkMode);
    }).catch((error) => {
      console.error('Error updating dark mode status:', error);
      res.status(500).json({ error: 'Failed to update dark mode status' });
    });
});

//export this router to use in our server.js
module.exports = router;