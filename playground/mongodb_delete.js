const {MongoClient, ObjectID} = require ('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // //deleteMany
    // db.collection('Todos').deleteMany({text: "Eat lunch"}).then((result) => {
    //     console.log(result.result);
    // });
    //
    // //deleteOne - vymaze jednu na zaciatku dalsie duplicitne necha
    // db.collection('Todos').deleteOne({text: "Eat lunch"}).then((result) => {
    //     console.log(result.result);
    // });
    //
    // //findOneAndDelete // vymaze jednu (napr podla id) a vypise ktory vymazalo
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Users').deleteMany({name: 'Jozef'}).then((res) => {
    //     console.log(res.result);
    // });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5b5b7233dcea5864ec450874')}).then((res) => {
        console.log(res);
    });


    client.close()
});