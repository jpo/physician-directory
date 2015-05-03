angular.module('starter.controllers')
  .controller('PhysiciansSearchCtrl', function($scope, $stateParams, $ionicLoading, $api) {
    var type = $stateParams.type;

    var finders = {
      'locations':   $api.getLocationsWithDistances,
      'specialties': $api.getSpecialties,
      'insurances':  $api.getInsurances
    };

    $scope.loading = $ionicLoading.show({
      content: '<i class="icon ion-loading-c"></i> Loading',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 200,
      showDelay: 500
    });

    finders[type](function(items) {
      $scope.type  = type;
      $scope.items = items;
      $scope.loading.hide();
    });
  })

  .controller('PhysiciansResultsCtrl', function($scope, $stateParams, $api) {
    var id   = $stateParams.id,
        type = $stateParams.type;

    var finders = {
      'locations':   $api.getPhysiciansByLocation,
      'specialties': $api.getPhysiciansBySpecialty,
      'insurances':  $api.getPhysiciansByInsurance
    };

    finders[type](id, function(physicians) {
      $scope.physicians = physicians;
    });
  })

  .controller('PhysiciansDetailCtrl', function ($scope, $stateParams, $api) {
    var id = $stateParams.id;
    $api.getPhysicianById(id, function(physician) {
      $scope.physician = physician;
    });
  })
;
