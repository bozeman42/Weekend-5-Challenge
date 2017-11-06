var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./modules/db.js');
var port = process.env.PORT || 5000;
var realEstate = require('./routes/realestate.router.js');
var rentalRouter = require('./routes/rental.router.js');
var listingRouter = require('./routes/listing.router.js');

app.use(bodyParser.json());
app.use(express.static('server/public'));

//routes
app.use('/realestate',realEstate);
app.use('/rent',rentalRouter);
app.use('/list',listingRouter);

app.listen(port, function() {
  console.log('Listening on port:', port);
});