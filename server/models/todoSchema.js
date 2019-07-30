const mongoose = require('mongoose');

let todoSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true,
        trim: true
    },
    message: {
        type: String,
        require: true,
        trim: true
    },
    importance: {
        type: String,
        require: true,
        trim: true
    },
    status: {
        type: String,
        require: true,
        trim: true
    }
});

module.exports = mongoose.model('Todo', todoSchema);