var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RentalSchema = new Schema({rent: Number, sqft: Number, city: String}, { collation: { locale: 'en_US', strength: 2 } });
var Rental = mongoose.model('Rental', RentalSchema, 'rentals');

// GET /
// return rental listings to the client
router.get('/',function(req,res){
  Rental.find({}, function(err,foundRentals){
    if (err) {
      console.log('Failed to GET rentals');
      res.sendStatus(500);
    } else {
      res.send(foundRentals);
    }
  });
});

// POST '/' add a rental property
router.post('/',function(req,res){
  var property = req.body;
    var propertyToAdd = new Rental({
      rent: property.cost,
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

// delete the selected property
router.delete('/', function(req,res){
  var property = req.query;
  Rental.findByIdAndRemove({ "_id": property.id }, function (err, data) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

// edit the selected property
router.put('/',function(req,res){
  var property = req.body;
  Rental.findByIdAndUpdate(property._id,property, function(err, data){
    if (err){
        console.log('Error',err);
        res.sendStatus(500);
    } else {
        res.sendStatus(200);
    }
  });
});

// search based upon city, price range, and area range
router.get('/search',function(req,res){
  var keyword = new RegExp(req.query.keyword,'i');
  var min = req.query.min;
  var max = req.query.max;
  var minArea = req.query.minArea;
  var maxArea = req.query.maxArea;
  Rental.find({
    city: keyword,
    rent: {$gte: min, $lte: max},
    sqft: {$gte: minArea, $lte: maxArea}
  }, function(err, data){
    if (err){
        console.log('Error',err);
        res.sendStatus(500);
    } else {
        res.send(data);
    }
  });
});

router.get('/featured',function(req,res){
  Rental.findOne().sort({rent: 1}).exec(function(err,featuredRental){
    if (err) {
      console.log('Failed to GET rentals');
      res.sendStatus(500);
    } else {
      res.send(featuredRental);
    }
  });
});

// return the minimum and maximum rent and area
router.get('/range',function(req,res){
  var returnObject = {
    min: '',
    max: ''
  };
  Rental.findOne().sort({rent: 1}).exec(function(err,minRental){
    if (err) {
      res.sendStatus(500);
    } else {
      returnObject.min = minRental.rent;
      Rental.findOne().sort({rent: -1}).exec(function(err,maxRental){
        if (err) {
          res.sendStatus(500);
        } else {
          returnObject.max = maxRental.rent;
          Rental.findOne().sort({sqft: 1}).exec(function(err,minRental){
            if (err) {
              console.log('Failed to GET minimum rental area');
              res.sendStatus(500);
            } else {
              returnObject.minsqft = minRental.sqft;
              Rental.findOne().sort({rent: -1}).exec(function(err,maxRental){
                if (err) {
                  console.log('Failed to GET max rental area');
                  res.sendStatus(500);
                } else {
                  returnObject.maxsqft = maxRental.sqft;
                  res.send(returnObject);
                }
              });
            }
          });
        }
      });
    }
  });
});


module.exports = router;