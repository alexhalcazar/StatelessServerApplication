// how we want to build our file so we can connect to mongo and use that connection throughout our application
// modularize our code
// everything related to mongo will go here i.e connections
// need mongo client 
const {MongoClient} = require('mongodb');

// omitted declaration in order to be a global variable
config = require('../config.json');
// ES6 style module here
const mongo = () => {
    let db = null;

    // get these from the mongo website
    // can see username password
    // we can put our <databasename> after mongodb.net/
    // can access from config with ${} config.usermae config.password config.database_name
    const mongoURL = `mongodb+srv://${config.username}:${config.password}@cluster0.ytxcfoh.mongodb.net/${config.database_name}?retryWrites=true&w=majority`;

    async function connect() {
        try {
            const client = new MongoClient(mongoURL);
            await client.connect();

            // if we connect successfully 
            // Create a new DB instance sharing the current socket connections
            // one optional parameter is a the name of the database we want to use as a String
            // if not provided , use database name from connection string
            // db is a class that represents a MongoDB database
            db = client.db();

            console.log('Connected to Mongo DB');
        } catch (error) {
            console.log(error);
        }
    }

    // collection name and save to any collection you pass in
    async function save(collectionName, data) {
        try {
            // pass in collection name you want to make changes on
            // returns a reference to a MongoDB Collection. If it does not exist it will be created implicitly
            const collection = db.collection(collectionName);
            
            // insertOne is in slides
            // method we call when we want to enter a single document 
            await collection.insertOne(data);
            // after we connect to the database we want to use the same instance of mongo that we connected to
            // we can do this with ES6 let db = null;
        } catch (error) {
            console.log(error);
        }
    }

    async function find(collectionName, recipeIdentifier) {
        try {
            // what collection we are going to operate on
            const collection = db.collection(collectionName);

            if(recipeIdentifier) {
                // in mongo we need to find by some key/value pair
                // you can use short hand notation in the parameter
                return await collection.find({searchTerm: recipeIdentifier}).next(); //typically would only get one result with an id
            } else {
                // will return an array of documents 
                return await collection.find({}).toArray();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function update(collectionName, recipeIdentifier, data) {
        try {
            const collection = db.collection(collectionName);

            // what item do we need to update
            // set is similar to how object.assign behaves
            await collection.updateOne(
                {searchTerm: recipeIdentifier}, // filter object that identifies object to be updated
                {$set: data});                  // update/create 
        } catch (error) {
            console.log(error);
        }
    }
    return {
        connect,
        save,
        find,
        update
    };
};

module.exports = mongo();

