var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true, // property text must exist
        minlength: 1,
        trim: true // vymaze medzery na zaciatku a na konci
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    },
    _creator:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = {Todo};
