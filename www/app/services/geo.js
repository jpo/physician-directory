/**
 * @ngdoc service
 * @name $geo
 * @requires $window
 *
 * @description
 * The $geo service is responsible for finding the device's current location
 * using the $window.navigator.geolocation api. It also provides helper methods
 * to make working with coordinates easier.
 */
angular.module('starter.services')
  .factory('$geo', function($window) {

    /**
   * @ngdoc method
   * @name $geo#getCurrentPosition
   *
   * @description
   * Gets the current position of the device.
   *
   * @param {function} success
   * A callback function that takes a Position object as its sole input
   * parameter.
   *
   * @param {function} error
   * An optional callback function that takes a PositionError object as its sole
   * input parameter.
   */
    var getCurrentPosition = function(success, error) {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000, // 5 seconds (5 * 1000)
        maximumAge: 300000 // 5 minutes (5 * 60 * 1000)
      };

      $window.navigator
             .geolocation
             .getCurrentPosition(success, error, options);
    };

    /**
   * @ngdoc method
   * @name $geo#getDistanceInMiles
   *
   * @description
   * Gets the distance, in miles, between two coordinates.
   *
   * @param {number} lat1 Latitude for first coordinate
   * @param {number} lon1 Longitude for first coordinate
   * @param {number} lat2 Latitude for second coordinate
   * @param {number} lon2 Longitude for second coordinate
   *
   * @returns {number} A number representing the distance between the given
   *                   coordinates in miles.
   */
    var getDistanceInMiles = function(lat1, lon1, lat2, lon2) {
      var earthRadiusInKm    = 6371;
      var earthRadiusInMiles = earthRadiusInKm * 0.621;

      var lat = lat2 - lat1; // Difference of latitude
      var lon = lon2 - lon1; // Difference of longitude

      // Vertical distance
      var disLat = (lat * Math.PI * earthRadiusInMiles) / 180;

      // Horizontal distance
      var disLon = (lon * Math.PI * earthRadiusInMiles) / 180;

      // Total distance (calculated by Pythagore: a^2 + b^2 = c^2)
      return Math.sqrt(Math.pow(disLat, 2) + Math.pow(disLon, 2));
    };

    return {
      getCurrentPosition: getCurrentPosition,
      getDistanceInMiles: getDistanceInMiles
    };
  })
;
