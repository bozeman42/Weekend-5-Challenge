app.controller('NewPropertyController', function(RealEstateService){
  console.log('NewPropertyController created');
  var vm = this;
  var rs = RealEstateService;
  vm.costType = '';
  vm.newProperty = rs.newProperty;

  // vm.costOrRent(propertyType) determines whether the form requests a rent or a cost
  // once a value is established the field will display and the submit button will appear
  vm.costOrRent = function(propertyType){
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

