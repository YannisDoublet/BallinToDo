const mongoose = require('mongoose');

let listSchema = new mongoose.Schema({
    ownerId: {
        type: String,
        require: true,
        trim: true
    },
    listId: {
        type: String,
        require: true,
        trim: true
    },
    title: {
        type: String,
        require: true,
        trim: true
    }
});

module.exports = mongoose.model('List', listSchema);