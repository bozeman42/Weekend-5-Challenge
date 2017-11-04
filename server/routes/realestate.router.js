var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RentalSchema = new Schema({rent: Number, sqft: Number, City: String});
var Rental = mongoose.model('Rental', RentalSchema, 'rentals');

var ListingSchema = new Schema({cost: Number, sqft: Number, City: String});
var Listing = mongoose.model('Listing', ListingSchema, 'listings');

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

module.exports = router;