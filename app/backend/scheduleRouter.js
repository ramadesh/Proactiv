var express = require('express');
var router = express.Router();

const ScheduleEvent = require('./scheduleSchema');
const { checkIfAuthenticated } = require('./checkAuthentication.js');

//TODO: get singular event & get all events for a single user
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
 
router.post('/', checkIfAuthenticated, async function(req, res){
    let newEvent = new ScheduleEvent();
    newEvent.userId = req.body.userId;
    newEvent.title = req.body.title;
    newEvent.details = req.body.details;
    newEvent.start = req.body.start;
    newEvent.end = req.body.end;

    newEvent.save().then(savedData => {
        res.status(200).json(savedData); // Return the saved data as the response
    })
    .catch(error => {
        console.error('Failed to create new schedule item:', error);
        res.status(500).json({ error: 'Failed to create new schedule event' });
    });
});

router.put('/', checkIfAuthenticated, async function(req, res){
    let { userId, eventId, title, details, start, end} = req.body;
    const updatedEvent = { title : title, details : details, start : start , end : end}
    const filter = { userId : userId, eventId : eventId};

    await ScheduleEvent.findOneAndUpdate(filter, updatedEvent, {new : true} ).then((data) => {
        if(data === null){
            // If no matching user is found, return a 404 status code
            console.log('Error: user not found');
            return res.status(404).json({ message: 'Error: user not found' });
        }
        // If a matching user is found, return the event data
        console.log(data._doc);
        res.status(200).json(data._doc);
    }).catch((error) => {
        console.error('Error editing schedule event:', error);
        res.status(500).json({ error: 'Failed to update schedule event' });
    });
});

router.delete('/', checkIfAuthenticated, async function(req, res) {
    let { userId, eventId} = req.query;
    const filter = { userId : userId , eventId : eventId};
    
    await ScheduleEvent.deleteOne(filter).then((data) => {
        if(data === null){
            // If no matching user is found, return a 404 status code
            console.log('Error: user and/or event not found');
            return res.status(404).json({ message: 'Error: user and/or event not found' });
        }
        // If a matching user is found, return the event data
        console.log(data._doc);
        res.status(200).json(data._doc);
    }).catch((error) => {
        console.error('Error deleting schedule event:', error);
        res.status(500).json({ error: 'Failed to delete schedule event' });
    });
});

//export this router to use in our server.js
module.exports = router;