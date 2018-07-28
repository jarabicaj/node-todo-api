var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://dzejo333:cathering3@ds257851.mlab.com:57851/node-todo-api');
//|| 'mongodb://localhost:27017/TodoApp'
module.exports = {mongoose};