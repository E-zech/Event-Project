import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

});

const Event = mongoose.model("users", eventSchema);
export default Event;