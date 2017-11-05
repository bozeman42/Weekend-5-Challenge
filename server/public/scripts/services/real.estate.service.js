app.service('RealEstateService', function($http, $uibModal){
  console.log('RealEstateService created');

  var rs = this;
  rs.result = {
    rentals: [],
    listings: [],
    propertyToEdit: {},
  };

  rs.newProperty = {
    propertyType: '',
    cost: '',
    sqft: '',
    city: ''
  };

  rs.data = {};

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
      swal('Success!','Property edits accepted.',{icon: 'success'});
      rs.refreshProperties();
    }).catch(function error(err){
      console.log('Edit failed',err);
    });
  };

});