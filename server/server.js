var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

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
    }
});

// var otherTodo= new Todo({
//     // text: 'Feed the cat',
//     // completed: true,
//     // completedAt: 123
//     text: 'Something to do'
// });

// otherTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2))
// }, (e) => {
//     console.log('Unable to save todo', e)
// });

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

var User = new User({
    email: 'mama.j@gmail.com'
});

User.save().then((res) => {
    console.log(res);
}, (err) => {
    console.log(err)
});
