//database operations into a node module to interact with the server
//four operations, insert, find, remove, update
const assert = require('assert');
exports.insertDocument = (db, document, collection, callback) => {
	//4(mongodb database connection, document to be inserted,
	//collection in which document has to be inserted, status once the operation is completed: a callback funtion  )
	const coll = db.collection(collection);//find collection in db connection and assign a value
	return coll.insert(document);
};
exports.findDocuments = (db, collection, callback) => {//3
	const coll = db.collection(collection);
	return coll.find({}).toArray();
};
exports.removeDocuments = (db, document, collection, callback) => {//4
	const coll = db.collection(collection);
	return coll.deleteOne(document);
};
exports.updateDocuments = (db, document, update, collection, callback) => {//5
	const coll = db.collection(collection);
	return coll.updateOne(document, { $set: update}, null);
};