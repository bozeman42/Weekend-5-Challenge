var mongoose = require('mongoose');
var databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/realestate';

mongoose.connection.on('connected', function(){
  console.log('mongoose is connected');
});

mongoose.connection.on('error', function() {
  console.log('mongoose connection failed');
});

mongoose.connect(databaseUrl,{useMongoClient: true});

module.exports = mongoose;