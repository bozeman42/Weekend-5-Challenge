var mongoose = require('mongoose');
if (process.env.MONGODB_URI != undefined){
  databaseUrl = proceass.eng.MONGODB_URI;
} else {
  databaseUrl = 'mongodb://localhost:27017/realestate';
}
mongoose.connection.on('connected', function(){
  console.log('mongoose is connected');
});

mongoose.connection.on('error', function() {
  console.log('mongoose connection failed');
});

mongoose.connect(databaseUrl,{useMongoClient: true});

module.exports = mongoose;