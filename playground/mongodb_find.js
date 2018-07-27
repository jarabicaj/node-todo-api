const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDB server');
    }
    console.log('Connect to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos')
    //     .find({_id: new ObjectID('5b5b7996a11dee1449a48718')}) // vytvorim novu instanciu ID
    //     .toArray()
    //     .then((docs) => {
    //         console.log('Todos');
    //         console.log(JSON.stringify(docs, undefined, 2));
    //
    //     }, (err) => {
    //         console.log('Unable to fetch todos', err)
    //     }); // metoda find nam poskytne pointer na dokumenty a ma mnoho metod a to Array vracia promisu

    // db.collection('Todos')
    //     .find()
    //     .count()
    //     .then((count) => {
    //         console.log(`Todos count: ${count}`);
    //
    //     }, (err) => {
    //         console.log('Unable to fetch todos', err)
    //     });

    db.collection('Users').find({name:'Jozef'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch', err)
    });


   client.close();
});