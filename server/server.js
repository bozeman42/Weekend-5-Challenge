var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var realEstate = require('./routes/realestate.router.js');
var db = require('./modules/db.js');
var port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(express.static('server/public'));

//routes
app.use('/realestate',realEstate);

app.listen(port, function() {
  console.log('Listening on port:', port);
});