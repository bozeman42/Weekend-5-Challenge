var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var realEstate = require('./routes/realestate.router.js');
var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static('server/public'));

//routes
app.use('/realestate',realEstate);

var mongoose = require('mongoose');
var databaseUrl = 'mongodb://localhost:27017/realestate';

mongoose.connection.on('connected', function(){
  console.log('mongoose is connected');
});

mongoose.connection.on('error', function() {
  console.log('mongoose connection failed');
});

mongoose.connect(databaseUrl,{useMongoClient: true});

app.listen(port, function() {
  console.log('Listening on port:', port);
});