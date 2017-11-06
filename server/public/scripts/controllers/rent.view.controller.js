app.controller('RentController', function(RealEstateService){
  console.log('RentController created');

  var rc = this;
  var rs = RealEstateService;
  rc.result = rs.result;
  rc.getRentals = function(){
    rs.getRentals();
    rc.getRentRange();
  };

  rc.deleteRental = function(id){
    console.log(id);
    rs.deleteProperty(id,'rental');
  };

  
  rc.editRental = function(property){
    rs.editProperty(property,'rental');
  };
  
  rc.searchRentals = function(keyword,searchRange,searchAreaRange){
    console.log('search rentals',keyword);
    rs.searchProperties(keyword,searchRange,searchAreaRange,'rental');
  };
  
  rc.clearSearch = function(){
    rc.getRentals();
    rc.result.searchTerm = '';
  };

  rc.getRentRange = function(){
    rs.getRentalRange();
  };
  rc.getRentals();
});