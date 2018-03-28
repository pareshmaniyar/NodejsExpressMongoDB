const MongoClient = require('mongodb').MongoClient;//connect to the mongoDB server
const assert = require('assert');            //to see the true/false value for err
const url = 'mongodb://localhost:27017';     //server hosted
const dboper = require('./operations');
MongoClient.connect(url).then((client) => {  //db gives access to database
    var db = client.db('conFusion');                    //1: client object containing the database object
    console.log('Connected Successfully to MongoDb server');
    //Step 1: Insert
    dboper.insertDocument(db, { "name": "Paresh", "description": "Maniyar"}, "dishes")
    .then( (result) => {
        console.log("Inserted Document:\n", result.ops);
        //Step 2: Find
        return dboper.findDocuments(db, "dishes");
    })
    .then((docs) => {
        console.log("Found these Documents:\n", docs);
        //Step 3: Update
        return dboper.updateDocuments(db, {name: "Paresh" }, {description: "Maniyar Updated"}, "dishes");
    })
    .then( (result) => {
        console.log("Update Completed: \n", result.result);//property which shows what has been updated
        //Step 4: Find Again
        return dboper.findDocuments(db, "dishes");
    })
    .then( (docs) => {
        console.log("Found Updated Documents:\n", docs);
        //Step 5: Drop collection
        return db.dropCollection("dishes");
    })
    .then( (result) => {
        console.log("Dropped Collection: ", result);
        //Step 6: Close the connection with the MongoDB server
        client.close();//client method in Mongo 3 version
    }).catch((err) => console.log(err));
}).catch((err) => console.log(err));