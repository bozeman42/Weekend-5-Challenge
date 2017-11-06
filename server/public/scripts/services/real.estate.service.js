app.service('RealEstateService', function($http, $uibModal){
  console.log('RealEstateService created');

  var rs = this;
  rs.result = {
    rentals: [],
    listings: [],
    propertyToEdit: {},
    searchTerm: '',
    rentalRange: {min: 0, max: 0},
    listingRange: {min: 0, max: 0},
    searchRange: {min: 0, max: 0},
    rentalAreaRange: {min: 0, max: 0},
    listingAreaRange: {min: 0, max: 0},
    searchAreaRange: {min: 0, max: 0},
    featuredListing: {},
    featuredRental: {}
  };

  rs.newProperty = {
    propertyType: '',
    cost: '',
    sqft: '',
    city: ''
  };

  rs.data = {};

  rs.getRentals = function(){
    $http.get('/realestate/rent')
    .then(function success(response){
      console.log('rentals', response.data);
      rs.result.rentals = response.data;
      rs.getRentalRange();
    })
    .catch(function error(error){
      console.log(error);
    });
    $http.get('/realestate/rent/featured')
    .then(function success(response){
      rs.result.featuredRental = response.data;
    })
    .catch(function error(err){
      console.log(err);
    });
  };

  rs.getListings = function(){
    $http.get('/realestate/sale')
    .then(function success(response){
      console.log('listings',response.data);
      rs.result.listings = response.data;
      rs.getListingRange();
    })
    .catch(function error(error){
      console.log(error);
    });
    $http.get('/realestate/sale/featured')
    .then(function success(response){
      rs.result.featuredListing = response.data;
    })
    .catch(function error(err){
      console.log(err);
    });
  };

  rs.getRentalRange = function(){
    $http.get('/realestate/rent/range')
    .then(function success(response){
      rs.result.rentalRange = response.data;
      rs.result.searchRange.min = rs.result.rentalRange.min;
      rs.result.searchRange.max = rs.result.rentalRange.max;
      rs.result.searchAreaRange.min = rs.result.rentalRange.minsqft;
      rs.result.searchAreaRange.max = rs.result.rentalRange.maxsqft;
      console.log('search range',rs.result.searchRange);
    })
    .catch(function error(){
      console.log('failed to get range',error);
    });
  };

  rs.getListingRange = function(){
    $http.get('/realestate/sale/range')
    .then(function success(response){
      rs.result.listingRange = response.data;
      rs.result.searchRange.min = rs.result.listingRange.min;
      rs.result.searchRange.max = rs.result.listingRange.max;
      rs.result.searchAreaRange.min = rs.result.listingRange.minsqft;
      rs.result.searchAreaRange.max = rs.result.listingRange.maxsqft;
      console.log('listing range', rs.result.listingRange);
    }).catch(function error(){
      console.log('failed to get range',error);
    });
  };

  rs.refreshProperties = function(){
    rs.getListings();
    rs.getRentals();
  };

  rs.addNewProperty = function(newProperty){

    $http.post('/realestate',newProperty)
    .then(function success(response){
      console.log('Successfully POSTed new property');
      rs.newProperty.propertyType = '';
      rs.newProperty.cost = '';
      rs.newProperty.sqft = '';
      rs.newProperty.city = '';
      swal('Success','New Property Added!',{icon: 'success'});
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
      if (propertyType === 'rental'){
        rs.getRentals();
      } else if (propertyType === "listing") {
        rs.getListings();
      }
    }).catch(function error(err){
      console.log('Failed to delete property');
    });
  };
  
  rs.editProperty = function(property,propertyType){
    rs.result.propertyToEdit = angular.copy(property);
    rs.result.propertyToEdit.propertyType = propertyType;
    rs.result.propertyToEdit.costType = (propertyType === 'listing')?'Cost':'Rent';
    console.log(rs.result.propertyToEdit);
    $uibModal.open({
      controller: 'EditModalController as ec',
      templateUrl: 'templates/editModal.html',
      windowTemplateUrl: 'vendors/uib/templates/modal/window.html',
      backdrop: 'static'
    }).result.then(function(result){
      rs.sendEdits(result,propertyType);
    }).catch(
      function error(reason){
        console.log('reason');
      }
    );
  };
  
  rs.sendEdits = function(property,propertyType){
    var config = { params: {propertyType: propertyType} };
    $http.put('/realestate',property,config)
    .then(function(response){
      if (propertyType === 'rental'){
        rs.getRentals();
      } else if (propertyType === "listing") {
        rs.getListings();
      }
      swal('Success!','Property edits accepted.',{icon: 'success'});
    }).catch(function error(err){
      console.log('Edit failed',err);
    });
  };

  rs.searchProperties = function(keyword,searchRange,searchAreaRange,propertyType){
    var config = {
      params: {
        keyword: keyword,
        propertyType: propertyType,
        min: searchRange.min,
        max: searchRange.max,
        minArea: searchAreaRange.min,
        maxArea: searchAreaRange.max
      }
    };
    $http.get('/realestate/search',config)
    .then(function success(response){
      console.log('Search response for',keyword + ':',response);
      var data = response.data;
      if (propertyType === 'rental'){
        rs.result.rentals = data;
      } else if (propertyType === 'listing'){
        rs.result.listings = data;
      }
    }).catch(function error(err){
      console.log('Search failed');
    });
  };
  rs.refreshProperties();
});