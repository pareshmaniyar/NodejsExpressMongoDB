const MongoClient = require('mongodb').MongoClient;//connect to the mongoDB server
const assert = require('assert');            //to see the true/false value for err
const url = 'mongodb://localhost:27017';     //server hosted
const dboper = require('./operations');
MongoClient.connect(url, (err, client) => {  //db gives access to database
    var db = client.db('conFusion');                    //1: client object containing the database object
    assert.equal(err, null); // if connected properly
    console.log('Connected Successfully to MongoDb server');
    //Step 1: Insert
    dboper.insertDocument(db, { "name": "Paresh", "description": "Maniyar"}, "dishes", (result) => {
        console.log("Inserted Document:\n", result.ops);
        //Step 2: Find
        dboper.findDocuments(db, "dishes", (docs) => {
            console.log("Found these Documents:\n", docs);
            //Step 3: Update
            dboper.updateDocuments(db, {name: "Paresh" }, {description: "Maniyar Updated"}, "dishes", (result) => {
                console.log("Update Completed: \n", result.result);//property which shows what has been updated
                //Step 4: Find Again
                dboper.findDocuments(db, "dishes", (docs) => {
                    console.log("Found Updated Documents:\n", docs);
                    //Step 5: Drop collection
                    db.dropCollection("dishes", (result) => {
                        console.log("Dropped Collection: ", result);
                        //Step 6: Close the connection with the MongoDB server
                        client.close();//client method in Mongo 3 version
                    });
                });
            });
        });
    });
});