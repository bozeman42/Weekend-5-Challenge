app.controller('EditModalController',function($uibModalInstance, RealEstateService){
  console.log('EditModalController created');
  var ec = this;
  var rs = RealEstateService;
  ec.result = rs.result;
  ec.editProperty = function(propertyToEdit){
    $uibModalInstance.close(propertyToEdit);
  };
  ec.dismiss = function(){
    $uibModalInstance.dismiss('Cancel');
  };
});