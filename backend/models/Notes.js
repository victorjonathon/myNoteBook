const mongoose = require('mongoose');

const NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.Now
    }
});

module.exports = mongoose.Schema('notes', NotesSchema);