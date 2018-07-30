const mongoose = require('mongoose');
const validator = require('validator');
// {
//     email: 'jarabica@example.com',
//     password: 'adsfsadfasdfasdfsadf',
//     tokens: [{
//         access: 'auth',
//         token: 'poiasdflsdfjlasjdfl'
//     }]
// }

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        unique: true, //unique in collection
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true

        }
    }]
});


module.exports = {User};