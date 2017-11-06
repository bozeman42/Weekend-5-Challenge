var app = angular.module('app',['ngRoute','ui.bootstrap']);

app.config(function($routeProvider){
  $routeProvider.when('/rent', {
    templateUrl: 'templates/rent.html',
    controller: 'RentController as rc'
}).when('/sale',{
  templateUrl: 'templates/sale.html',
  controller: 'SaleController as sc'
}).when('/new', {
  templateUrl: 'templates/new.html',
  controller: 'NewPropertyController as nc'
}).otherwise({
  templateUrl: 'templates/sale.html',
  controller: 'SaleController as sc'
});

});