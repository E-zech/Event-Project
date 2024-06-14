import mongoose from "mongoose";

export const notesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    }

}, { _id: false });

const Notes = mongoose.model("notes", notesSchema);
export default Notes;