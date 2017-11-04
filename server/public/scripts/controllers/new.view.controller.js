app.controller('NewPropertyController', function(RealEstateService){
  console.log('NewPropertyController created');
  var vm = this;
  var rs = RealEstateService;
  vm.costType = '';
  vm.newProperty = rs.newProperty;
  vm.costOrRent = function(propertyType){
    var costType = '';
    if (propertyType === 'rent'){
      vm.costType = 'Rent';
    } else {
      vm.costType = 'Cost';
    }
  };

  vm.addNewProperty = function(newProperty){
    rs.addNewProperty(newProperty);
  };
  
  vm.costOrRent(vm.newProperty.propertyType);
});

