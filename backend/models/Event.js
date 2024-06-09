import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    // ID of the user who created the event
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Array of ID's of team members who's on the Event
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

    // Name of the Event
    eventName: {
        type: String,
        required: true
    },

    // Where's the Event stand's right now, can be 1 of the following : 'at work', 'stuck', 'didnt start', 'done'
    status: {
        type: String,
        enum: ['at work', 'stuck', 'didnt start', 'done'],
        default: 'didnt start'
    },

    // The Date the Event Sopused to happend
    dueDate: Date,

    // The priority of the Event, can be 1 of the following:  'low', 'medium', 'high', 'critical'
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'low'
    },

    // Notes that can be added from the team regarding the Event and the process
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        text: String
    }],

    // The start and end date of the Event 
    timeLine: String,

    // The last date someone added the Event (the creator or one of the team)
    LastUpdate: {
        type: Date,
        default: Date.now()
    },
});

const Event = mongoose.model("events", eventSchema);
export default Event;