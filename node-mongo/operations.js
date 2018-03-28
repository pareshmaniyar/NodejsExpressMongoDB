//database operations into a node module to interact with the server
//four operations, insert, find, remove, update
const assert = require('assert');
exports.insertDocument = (db, document, collection, callback) => {
	//4(mongodb database connection, document to be inserted,
	//collection in which document has to be inserted, status once the operation is completed: a callback funtion  )
	const coll = db.collection(collection);//find collection in db connection and assign a value
	coll.insert(document, (err, result) => { //insert the document in using insert method(Mongo driver i guess)
		assert.equal(err, null);
		console.log("Inserted " + result.result.n +" documents into the collection " + collection);
		//specifies no of documents inserted, and prints the collection
		callback(result);//it sends result of whole collection to the index.js file after completion
		//above object has various properties like ops which states all the inserted operations
	});

};
exports.findDocuments = (db, collection, callback) => {//3
	const coll = db.collection(collection);
	coll.find({}).toArray((err, docs) => {//find the whole document
		assert.equal(err, null);// nothing is being printed
		callback(docs);//sends whole collection
	});
};
exports.removeDocuments = (db, document, collection, callback) => {//4
	const coll = db.collection(collection);
	coll.deleteOne(document, (err, result) => {
		assert.equal(err, null);
		console.log("Removed the document ", document);
        callback(result);//sends whole collection which might be null if empty
	});
};
exports.updateDocuments = (db, document, update, collection, callback) => {//5
	const coll = db.collection(collection);
	coll.updateOne(document, { $set: update}, null, (err, result) => {
		assert.equal(err, null);
        console.log("Updated the document with ", update);
        callback(result);
	});
};