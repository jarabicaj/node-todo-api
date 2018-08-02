const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

//first method of bcrypt
bcrypt.genSalt(10, (err, salt) => {
   bcrypt.hash(password, salt, (err, hash) => {
      console.log(hash);
   })
});

var hashedPassword = '$2a$10$8O4Oh4J/liNnOWyyk0jW3eayKp3FhYou0SzD6P/7cujioOS1ZnZFi';

bcrypt.compare(password, hashedPassword, (err, res) => {
   console.log(res);
});




//second method of bcrypt



// npm install crypto-js@3.1.6 --save
// very basic hash function

//
// var data = {
//     id: 10
// };
//
// //takes the object and hashes that and return token value
// //takes the token with the secret and makes sure the data was not manipuated
//
// var token = jwt.sign(data, '123abc');
//
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc');
//
// console.log('decoded', decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();  // result of SHA256() is an object
//                                         // hash message will be still the same for our specified message
// console.log(`Message: ${message}`);     // when someone will want oto log in in future, the message will be hashing
// console.log(`Hash: ${hash}`);           // and compare with the original hash
//
// var data = {                            // data we wanna send back to the client
//     id: 4
// };
//
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString() // 'somesecret' is just on server
// };
//
// // token.data.id = 5;                                            // some user want to change data but
// // token.hash = SHA256(JSON.stringify(token.data)).toString();   // does not know 'somesecret'
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (token.hash === resultHash) {
//     console.log('Data was not changed.');
// } else {
//     console.log('Data was changed. Do not trust!');
// }


