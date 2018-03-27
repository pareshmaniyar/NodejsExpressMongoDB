const MongoClient = require('mongodb').MongoClient; //connect to the mongoDB server
const assert = require('assert');                   //to see the true/false value for err
const url = 'mongodb://localhost:27017';  //server hosted
MongoClient.connect(url, (err, client) => {             //db gives access to database
    var db = client.db('conFusion');                  //client object containing the database object
    assert.equal(err, null); // if connected properly
    console.log('Connected Successfully to MongoDb server');
    const collection = db.collection("dishes");
    collection.insertOne({"name": "Paresh 5", "description": "Maniyar 5"},
        (err, result) => {
            assert.equal(err, null);
            console.log("After Insert: \n");
            console.log(result.ops);
            collection.find({}).toArray((err, docs) => { //Finding empty/all the documents and putting in docs
                assert.equal(err, null);
                console.log("Found: \n");
                console.log(docs);
                collection.drop((err, result) => {//remove dishes collection and make it empty
                    assert.equal(err, null);
                    client.close();//close method moved to the client in version ^3.
                });
            });
        });
});