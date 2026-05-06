const { MongoClient } = require('mongodb');

let database;

const initDb = async (callback) => {
  if (database) {
    console.log('Database already initialized');
    return callback(null, database);
  }

  try {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    database = client.db();
    callback(null, database);
  } catch (err) {
    callback(err);
  }
};

const getDb = () => {
  return database;
};

module.exports = { initDb, getDb };