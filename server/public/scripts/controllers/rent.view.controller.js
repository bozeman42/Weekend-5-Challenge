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
    rs.deleteProperty(id,'rental');
  };

  
  rc.editRental = function(property){
    rs.editProperty(property,'rental');
    rs.getRentalRange();
  };
  
  rc.searchRentals = function(keyword,searchRange,searchAreaRange){
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