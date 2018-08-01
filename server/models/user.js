const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
// {
//     email: 'jarabica@example.com',
//     password: 'adsfsadfasdfasdfsadf',
//     tokens: [{                       // it is array of objects
//         access: 'auth',              // type of token
//         token: 'poiasdflsdfjlasjdfl' // actual token value
//     }]
// }

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        unique: true,                       // unique email in collection
        validate: {                         // custom validation
            validator: validator.isEmail,   // verify the string is valid email
            message: '{VALUE} is not valid email'
        }
        // validate: { // it is the same as above
        //     validator: (value) => {
        //         return validator.isEmail(value) // return true if email is valid or return false if email is invalid
        //     },
        //     message: '{VALUE} is not valid email'
        // }
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

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);

};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    // user.tokens.push({access, token});
    user.tokens = user.tokens.concat([{access, token}]);
    return user.save().then(() => {
        return token;
    });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};