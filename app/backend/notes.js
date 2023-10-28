var express = require('express');
var router = express.Router();

const UserPass = require('./userpass');
const { checkIfAuthenticated } = require('./checkAuthentication.js');


router.get('/', checkIfAuthenticated, async function(req, res){
    const { userId } = req.query;
    const filter = { userId : userId, deleted: false};
    const projection = { "note" : 1 };
    await UserPass.findOne(filter, projection).then((data) => {
        if(data === null){
            // If no matching user is found, return a 404 status code
            console.log('Error: user not found');
            return res.status(404).json({ message: 'Error: user not found' });
        }
        // If a matching user is found, return note
        console.log("Note: " + data._doc.note);
        res.status(200).json(data._doc.note);
    }).catch((error) => {
        console.error('Error getting note text:', error);
        res.status(500).json({ error: 'Failed to get note text' });
    });
 });

 router.put('/', checkIfAuthenticated, async function(req, res){
    let { userId, note } = req.body;
    const filter = { userId : userId, deleted: false};

    await UserPass.findOneAndUpdate(filter, { note : note }).then((data) => {
        if(data === null){
          // If no matching user is found, return a 404 status code
          console.log('Error: user not found');
          return res.status(404).json({ message: 'Error: user not found' });
        }
        // If a matching user is found, return the profile data
        console.log("Note: " + data._doc.note);
        res.status(200).json(data._doc.note);
      }).catch((error) => {
        console.error('Error updating note:', error);
        res.status(500).json({ error: 'Failed to update note' });
      });
 });

//export this router to use in our server.js
module.exports = router;