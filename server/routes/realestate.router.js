var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RentalSchema = new Schema({rent: Number, sqft: Number, city: String}, { collation: { locale: 'en_US', strength: 2 } });
var Rental = mongoose.model('Rental', RentalSchema, 'rentals');

var ListingSchema = new Schema({cost: Number, sqft: Number, city: String}, { collation: { locale: 'en_US', strength: 2 } });
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
  console.log('req.body',req.body);
  var property = req.body;
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

router.delete('/', function(req,res){
  console.log('In the delete route');
  console.log(req.query);
  var property = req.query;
  if (property.propertyType === 'rental'){
    Rental.findByIdAndRemove({ "_id": property.id }, function (err, data) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log('deleted',data);
        res.sendStatus(200);
      }
    });
  } else if (property.propertyType === 'listing'){
    Listing.findByIdAndRemove({ "_id": property.id }, function (err, data) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log('deleted',data);
        res.sendStatus(200);
      }
    });
  } else {
    res.sendStatus(500);
  }
});

router.put('/',function(req,res){
  var propertyType = req.query.propertyType;
  var property = req.body;
  console.log(req.body);
  console.log('property type',propertyType);
  if (propertyType === 'rental'){
    Rental.findByIdAndUpdate(property._id,property, function(err, data){
      if (err){
          console.log('Error',err);
          res.sendStatus(500);
      } else {
          res.sendStatus(200);
          console.log('Rental updated',data);
      }
    });
  } else if (propertyType === 'listing'){
    Listing.findByIdAndUpdate(property._id,property, function(err, data){
      if (err){
          console.log('Error',err);
          res.sendStatus(500);
      } else {
          res.sendStatus(200);
          console.log('Listing updated',data);
      }
    });
  } else {
    console.log('Improper property type.');
    res.sendStatus(500);
  }
});

router.get('/search',function(req,res){
  var keyword = new RegExp(req.query.keyword,'i');
  var min = req.query.min;
  var max = req.query.max;
  console.log('min',min,'max',max);
  var propertyType = req.query.propertyType;
  if (propertyType === 'rental'){
    Rental.find({
      city: keyword,
      rent: {$gte: min, $lte: max}
    }, function(err, data){
      if (err){
          console.log('Error',err);
          res.sendStatus(500);
      } else {
          console.log('sending',data);
          res.send(data);
      }
    });
  } else if (propertyType === 'listing'){
    Listing.find({
      city: keyword,
      $and: [
        {cost: {$gte: min}},
        {cost: {$lte: max}}
      ]
    }, function(err, data){
      if (err){
        console.log('Error',err);
        res.sendStatus(500);
      } else {
        console.log('sending',data);
        res.send(data);
      }
    });
  } else {
    console.log('Improper property type.');
    res.sendStatus(500);
  }
  // Game.find({name: searchTerm}, function(err,foundGames){
  //     if (err) {
  //         console.log('Search failed',err);
  //         sendStatus(500);
  //     } else {
  //         res.send(foundGames);
  //     }
  // });
});

router.get('/rent/cheapest',function(req,res){
  Rental.findOne().sort({rent: 1}).exec(function(err,cheapestRental){
    if (err) {
      console.log('Failed to GET rentals');
      res.sendStatus(500);
    } else {
      console.log('Got rentals');
      res.send(cheapestRental);
    }
  });
});


// return the minimum and maximum rent
router.get('/rent/range',function(req,res){
  var returnObject = {
    min: '',
    max: ''
  };
  console.log('getting rental range');
  Rental.findOne().sort({rent: 1}).exec(function(err,minRental){
    if (err) {
      console.log('Failed to GET minimum rental price');
      res.sendStatus(500);
    } else {
      console.log('Got minRental');
      console.log(minRental.rent);
      returnObject.min = minRental.rent;
      Rental.findOne().sort({rent: -1}).exec(function(err,maxRental){
        if (err) {
          console.log('Failed to GET max rental price');
          res.sendStatus(500);
        } else {
          console.log('Got rental range');
          returnObject.max = maxRental.rent;
          console.log(returnObject);
          res.send(returnObject);
        }
      });
    }
  });
});

router.get('/sale/range',function(req,res){
  var returnObject = {
    min: '',
    max: ''
  };
  Listing.findOne().sort({cost: 1}).exec(function(err,minListing){
    if (err) {
      console.log('Failed to GET min listing price');
      res.sendStatus(500);
    } else {
      console.log('Got listings', minListing);
      returnObject.min = minListing.cost;
      Listing.findOne().sort({cost: -1}).exec(function(err,maxListing){
        if (err) {
          console.log('Failed to GET max listing price');
          res.sendStatus(500);
        } else {
          console.log('Got listing range');
          returnObject.max = maxListing.cost;
          res.send(returnObject);
        }
      });
    }
  });
});

module.exports = router;