app.service('RealEstateService', function($http){
  console.log('RealEstateService created');

  var rs = this;
  rs.result = {
    rentals: [],
    listings: []
  };

  rs.newProperty = {
    propertyType: '',
    cost: 0,
    rent: 0,
    city: ''
  };

  rs.getRentals = function(){
    $http.get('/realestate/rent').then(
      function success(response){
        console.log('rentals', response.data);
        rs.result.rentals = response.data;
      }
    )
    .catch(
      function error(error){
        console.log(error);
      }
    );
  };

  rs.getListings = function(){
    $http.get('/realestate/sale').then(
      function success(response){
        console.log('listings',response.data);
        rs.result.listings = response.data;
      }
    )
    .catch(
      function error(error){
        console.log(error);
      }
    );
  };

});