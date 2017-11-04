var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RentalSchema = new Schema({rent: Number, sqft: Number, City: String});
var Rental = mongoose.model('Rental', RentalSchema, 'rentals');

var ListingSchema = new Schema({cost: Number, sqft: Number, City: String});
var Listing = mongoose.model('Listing', ListingSchema, 'listings');


// GET /rent
// return rental listings to the client
router.get('/rent',function(req,res){
  Rental.find({}, function(err,foundRentals){
    if (err) {
      console.log('Failed to GET rentals');
      res.sendStatus(500);
    } else {
      console.log('Got rentals');
      res.send(foundRentals);
    }
  });
});

// GET /sale
// return sale listings to client
router.get('/sale',function(req,res){
  Listing.find({}, function(err,foundListings){
    if (err) {
      console.log('Failed to GET listings');
      res.sendStatus(500);
    } else {
      console.log('Got listings');
      res.send(foundListings);
    }
  });
});

// POST /
// receives an object in the form
// {
//   propertyType: '',
//   cost: '',
//   sqft: '',
//   city: ''
// }
// based upon propertyType, construct an object to send to mongo
// rent:
// {
//   rent,
//   sqft,
//   city
// }

// sale:
// {
//   cost,
//   sqft,
//   city
// }
router.post('/',function(req,res){
  var property = req.body;
  console.log(property);
  res.sendStatus(201);
});


module.exports = router;