var express = require('express');
var router = express.Router();

const ScheduleEvent = require('./scheduleSchema');
const { checkIfAuthenticated } = require('./checkAuthentication.js');

router.get('/:id', checkIfAuthenticated, async function(req, res){
    const { userId } = req.query;
    const filter = { userId : userId, eventId : req.params.id};
    const projection = { "userId" : 1, "eventId" : 1, "title" : 1, "details" : 1, "start" : 1, "end" : 1 };
    await ScheduleEvent.findOne(filter, projection).then((data) => {
        if(data === null){
            // If no matching event is found, return a 404 status code
            console.log('Error: schedule event not found');
            return res.status(404).json({ message: 'Error: schedule event not found' });
        }
        // If a matching schedule event is found, return it
        console.log(data._doc);
        res.status(200).json(data._doc);
    }).catch((error) => {
        console.error('Error getting schedule event:', error);
        res.status(500).json({ error: 'Failed to get schedule event' });
    });
});

router.get('/', checkIfAuthenticated, async function(req, res){
    const userId = req.query.userId;
    const date = req.query.date;
    const projection = { "userId" : 1, "eventId" : 1, "title" : 1, "details" : 1, "start" : 1, "end" : 1 };
    var filter = {};
    if(date == undefined) {
        filter = { userId : userId }; 
    } else {
        const datePlusOne = new Date(date + "Z");
        datePlusOne.setDate(datePlusOne.getDate() + 1);
        const datePlusOneStr = datePlusOne.toISOString();
        filter = { userId : userId, start : { $gte : date, $lte : datePlusOneStr }, end : { $lte : datePlusOneStr } };
    }
    await ScheduleEvent.find(filter, projection).then((data) => {
        if(data === null){
            // If no matching event is found, return a 404 status code
            console.log('Error: event not found');
            return res.status(404).json({ message: 'Error: event not found' });
        }
        // If a matching user is found, return their schedule
        console.log(data);
        res.status(200).json(data);
    }).catch((error) => {
        console.error('Error getting all schedule events for the given user:', error);
        res.status(500).json({ error: 'Failed to get all schedule events for the given user' });
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

router.delete('/:id', checkIfAuthenticated, async function(req, res) {
    let { userId } = req.query;
    const filter = { userId : userId , eventId : req.params.id };
    
    await ScheduleEvent.deleteOne(filter).then((data) => {
        if(data === null){
            // If no matching user is found, return a 404 status code
            console.log('Error: user and/or event not found');
            return res.status(404).json({ message: 'Error: user and/or event not found' });
        }
        // If a matching user is found, return the event data
        console.log(data.acknowledged);
        res.status(200).json(data.acknowledged);
    }).catch((error) => {
        console.error('Error deleting schedule event:', error);
        res.status(500).json({ error: 'Failed to delete schedule event' });
    });
});

//export this router to use in our server.js
module.exports = router;