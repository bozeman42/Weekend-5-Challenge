app.controller('SaleController', function(RealEstateService){
  console.log('SaleController created');

  var sc = this;
  var rs = RealEstateService;
  sc.result = rs.result;
  sc.getListings = function(){
    rs.getListings();
  };

  sc.getListings();


});