const { connect, connection } = require("mongoose");

//creating or connecting to the mongodb database
const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socially";

connect(connectionString);

module.exports = connection;