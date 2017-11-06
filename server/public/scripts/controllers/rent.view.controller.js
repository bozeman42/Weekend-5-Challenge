app.controller('RentController', function(RealEstateService){
  console.log('RentController created');

  var rc = this;
  var rs = RealEstateService;
  rc.result = rs.result;
  rc.getRentals = function(){
    rs.getRentals();
  };

  rc.deleteRental = function(id){
    console.log(id);
    rs.deleteProperty(id,'rental');
  };

  
  rc.editRental = function(property){
    rs.editProperty(property,'rental');
  };
  
  rc.searchRentals = function(keyword){
    console.log('search rentals',keyword);
    rs.searchProperties(keyword,'rental');
  };
  
  rc.clearSearch = function(){
    rc.getRentals();
    rc.result.searchTerm = '';
  };
  
  rc.getRentals();
});