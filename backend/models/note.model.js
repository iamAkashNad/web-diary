const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "No Tag"
    },
    date: {
        type: Date,
    }
});

const Note = mongoose.model("notes", noteSchema);
module.exports = Note;
