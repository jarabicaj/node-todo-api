require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser'); // take JSON and convert it into an object
const {ObjectID} = require('mongodb');

var {mongoose} = require ('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
   var todo = new Todo({
       text: req.body.text,
       _creator: req.user._id
   });

   todo.save().then((doc) => {
       res.send(doc);
   }, (e) => {
       res.status(400).send(e);
   });
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos});
    }, (err) => {
        res.send(err)
    })
});

app.get('/todos/:id', authenticate, (req, res) => {
   var id = req.params.id;

   if(!ObjectID.isValid(id)) {
      return res.status(404).send((`ID: ${id} is not valid.`));
   }

   Todo.findOne({
       _id: id,
       _creator: req.user._id
   }).then((todo) => {
       if (!todo) {
           return res.status(404).send();
       }
       res.send({todo});
   }).catch((e) => {
       res.status(400).send();
   })
});

app.delete('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send(`Id ${id} is invalid!`);
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((err) => {
        res.status(400).send();
    })
});

app.patch('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send(`Id ${id} is invalid!`);
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completedAt = null;
        body.completed = false;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        };

        res.send({todo});

    }).catch((e) => {
        res.status(400).send()
    });
});

app.get('/users', (req, res) => {
    User.find().then((allUsers) => {
        res.send({allUsers})
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email','password']);

    var newUser = new User (body);

    newUser.save().then(() => {
        // res.send(newUser);
        return newUser.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email,body.password).then((user) => {
        //res.send(user);
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        })
    }).catch((e) => {
        res.status(400).send();
    })




});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, (err) => {
        res.status(400).send(err);
    })
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

module.exports = {app};
