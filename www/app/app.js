angular.module('starter.controllers', []);
angular.module('starter.filters', []);
angular.module('starter.services', []);

var starter = angular.module('starter', [
  'ionic',
  'starter.controllers',
  'starter.filters',
  'starter.services'
]);

starter.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'app/views/home.html'
    })

    .state('physicians-search-menu', {
      url: '/physicians/menu',
      templateUrl: 'app/views/physicians/menu.html'
    })

    .state('physicians-search-type', {
      url: '/physicians/{type:locations|specialties|insurances}',
      templateUrl: 'app/views/physicians/search.html',
      controller: 'PhysiciansSearchCtrl'
    })

    .state('physicians-search-results', {
      url: '/physicians/{type:locations|specialties|insurances}/{id:[0-9]+}',
      templateUrl: 'app/views/physicians/results.html',
      controller: 'PhysiciansResultsCtrl'
    })

    .state('physicians-detail', {
      url: '/physicians/{id:[0-9]+}',
      templateUrl: 'app/views/physicians/detail.html',
      controller: 'PhysiciansDetailCtrl'
    })

    .state('locations-index', {
      url: '/locations',
      templateUrl: 'app/views/locations/list.html',
      controller: 'LocationsListCtrl'
    })

    .state('locations-detail', {
      url: '/locations/:id',
      templateUrl: 'app/views/locations/detail.html',
      controller: 'LocationsDetailCtrl'
    })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
});
