var app = angular.module('app',['ngRoute']);

app.config(function($routeProvider){
  $routeProvider.when('/rent', {
    templateUrl: 'templates/rent.html',
    controller: 'RentController as rc'
  }).when('/sale',{
    templateUrl: 'templates/sale.html',
    controller: 'SaleController'
  });
});