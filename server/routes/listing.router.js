var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListingSchema = new Schema({cost: Number, sqft: Number, city: String}, { collation: { locale: 'en_US', strength: 2 } });
var Listing = mongoose.model('Listing', ListingSchema, 'listings');


// GET /
// return sale listings to client
router.get('/',function(req,res){
  Listing.find({}, function(err,foundListings){
    if (err) {
      console.log('Failed to GET listings');
      res.sendStatus(500);
    } else {
      res.send(foundListings);
    }
  });
});


router.post('/',function(req,res){
  var property = req.body;
  var propertyToAdd = new Listing({
    cost: property.cost,
    sqft: property.sqft,
    city: property.city
  });
  propertyToAdd.save(function(err, data){
    if(err) {
        console.log(err);
        res.sendStatus(500);
    } else {
        res.sendStatus(201);
    }
  });
});

//todo! : finish building out listing router