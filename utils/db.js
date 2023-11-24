const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);

let dbInstance;

async function connectToMongoDB() {
  try {
    await mongoClient.connect();
    dbInstance = mongoClient.db();
    return mongoClient.db();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

function getStarsCollection() {
  if (!dbInstance) return;
  try {
    return dbInstance.collection("stars");
  } catch (error) {
    console.error("Database not connected.");
  }
}

module.exports = { connectToMongoDB, getStarsCollection };
