app.service('RealEstateService', function($http){
  console.log('RealEstateService created');

  var rs = this;
  rs.result = {
    rentals: [],
    listings: []
  };

  rs.newProperty = {
    propertyType: '',
    cost: '',
    sqft: '',
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

  rs.refreshProperties = function(){
    rs.getListings();
    rs.getRentals();
  }

  rs.addNewProperty = function(newProperty){

    $http.post('/realestate',newProperty)
    .then(function success(response){
      console.log('Successfully POSTed new property');
    })
    .catch(function failure(err){
      console.log('POST failed',err);
    });
  };

  rs.deleteProperty = function(id,propertyType){
    var config = { params: { id: id, propertyType: propertyType} };
    $http.delete('/realestate', config)
    .then(function success(response){
      console.log('Property deleted');
      rs.refreshProperties();
    }).catch(function error(err){
      console.log('Failed to delete property');
    });
  };
  
});