angular.module('starter.controllers')
  .controller('LocationsListCtrl', function ($scope, $api) {
    $api.getLocationsByType('Urgent Care', function (locations) {
      $scope.locations = locations;
    });
  })

  .controller('LocationsDetailCtrl', function ($scope, $stateParams, $api) {
    var id = $stateParams.id;
    $api.getLocationById(id, function (location) {
      $scope.location = location;
    });
  })
;
