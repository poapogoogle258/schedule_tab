const mongoose = require('mongoose');

const { MONGODB ,MONGODB_HOST , MONGODB_PORT , MONGODB_USER , MONGODB_PASSWORD } = process.env

const MONGODB_URL = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB}`  //createUrlConnectDatabase

const dbConnection = mongoose.createConnection(MONGODB_URL, {
  dbName : MONGODB ,
  user : MONGODB_USER ,
  pass : MONGODB_PASSWORD,
});


module.exports = dbConnection;
