import mongoose from "mongoose";
import { notesSchema } from "./Notes";

const eventSchema = new mongoose.Schema({

    // Name of the Event
    eventName: {
        type: String,
        required: true
    },

    // ID of the user who created the event
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Array of ID's of team members/stuff who's on the Event - (the admin can add/remove members)
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        fullName: String,
    }],

    // status - Where's the Event stand's right now, can be 1 of the following : 'in progress', 'stuck', 'not started', 'Finished'
    status: {
        type: String,
        enum: ['in progress', 'stuck', 'not started', 'Finished'],
        default: 'didnt start'
    },

    // The Date the Event Sopused to happend
    dueDate: String,

    // The priority of the Event, can be 1 of the following:  'low', 'medium', 'high', 'critical'
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'low'
    },

    // Notes that can be added from the team regarding the Event and the process
    notes: [notesSchema],

    // The start and end date of the Event for example: 2024-06-25 to 2024-06-30
    timeLine: String,

    // The last date someone added the Event (the creator or one of the team)
    LastUpdate: {
        type: Date,
        default: Date.now()
    },
});

const Event = mongoose.model("events", eventSchema);
export default Event;