app.controller('SaleController', function(RealEstateService){
  console.log('SaleController created');

  var sc = this;
  var rs = RealEstateService;
  sc.result = rs.result;

  sc.getListings = function(){
    rs.getListings();
    sc.getListingRange();
  };

  sc.deleteListing = function(id){
    console.log(id);
    rs.deleteProperty(id,'listing');
  };
  
  sc.editListing = function(property){
    rs.editProperty(property,'listing');
  };
  
  sc.searchListings = function(keyword,searchRange,searchAreaRange){
    console.log('search listings',keyword);
    rs.searchProperties(keyword,searchRange,searchAreaRange,'listing');
  };
  
  sc.clearSearch = function(){
    sc.getListings();
    sc.result.searchTerm = '';
  }

  sc.getListingRange = function(){
    rs.getListingRange();
  };

  sc.getListings();
});