const { MongoClient } = require('mongodb');
let dbConnectionUrl='mongodb://127.0.0.1:27017';
const client = new MongoClient(dbConnectionUrl);
let dbConnect=async()=>{
    await client.connect();
    let db=client.db("libraryDB");
    return db;
}
module.exports={dbConnect};