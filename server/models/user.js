const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
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
    var user = this; // this poukazuje na daný dokument
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    // user.tokens.push({access, token});
    user.tokens = user.tokens.concat([{access, token}]);
    return user.save().then(() => {
        return token;
    });


};

UserSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({
        $pull: {
            tokens: {token}}
    })
};

// var genAuthToken = (user) => {
//     var access = 'auth';
//     var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
//
//     user.tokens = user.tokens.concat([{access, token}]);
//     return user.save().then(() => {
//         return token;
//     })
// };

UserSchema.statics.findByToken = function (token) {
    var User = this; // this poukazuje na model
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123')
    } catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject()
        // });
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.access': 'auth',
        'tokens.token': token
    });
};

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            })
        })
    });

};

UserSchema.pre('save', function (next) { //mongoose middleware, that runs before the event, in this case save
    var user = this; //individual document

    if(user.isModified('password')) { // it runs in case a password id modified

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next()
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};