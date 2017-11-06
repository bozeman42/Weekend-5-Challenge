app.controller('NavController', function(){
  var vm = this;
  vm.activeMenuItem = 'listing';
  vm.setMenuItem = function(active){
    vm.activeMenuItem = active;
  };
});