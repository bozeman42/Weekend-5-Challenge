app.controller('RentController', function(RealEstateService){
  console.log('RentController created');

  var rc = this;
  var rs = RealEstateService;
  rc.result = rs.result;
  rc.getRentals = function(){
    rs.getRentals();
  };

  rc.getRentals();

});