var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RentalSchema = new Schema({rent: Number, sqft: Number, city: String});
var Rental = mongoose.model('Rental', RentalSchema, 'rentals');

var ListingSchema = new Schema({cost: Number, sqft: Number, city: String});
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
//   propertyType: ('rent' or 'sale'),
//   cost: Number,
//   sqft: Number,
//   city: String
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
  if (property.propertyType === 'rent'){
    var propertyToAdd = new Rental({rent: property.cost, sqft: property.sqft, city: property.city});
  } else {
    var propertyToAdd = new Listing({cost: property.cost, sqft: property.sqft, city: property.city});
  }
  propertyToAdd.save(function(err, data){
    if(err) {
        console.log(err);
        res.sendStatus(500);
    } else {
        res.sendStatus(201);
    }
  });
});


module.exports = router;