var _ = require('lodash');

user = {
    name: "Jozef",
    email: "jarabica@gmail.com",
    ahoj: "a"
    };

var body = _.pick(user, ['name','email']);
console.log(body);