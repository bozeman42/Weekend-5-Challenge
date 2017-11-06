var express = require('express');
var router = express.Router();


router.get('/rent',function(req,res){
  Rental.find({}, function(err,foundRentals){
    if (err) {
      console.log('Failed to GET rentals');
      res.sendStatus(500);
    } else {
      res.send(foundRentals);
    }
  });
});