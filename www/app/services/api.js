/**
 * @ngdoc service
 * @name $api
 * @requires $http
 * @requires $geo
 *
 * @description
 * The $api service is responsible querying data from the application's JSON
 * api.
 */
angular.module('starter.services')
  .factory('$api', function ($http, $geo) {

    /**
    * @ngdoc method
    * @name $api#getPhysiciansByLocation
    *
    * @description
    * Retrieves a collection of physicians that belong to the given location id.
    *
    * @param {number} id
    * The location id.
    *
    * @param {function} success
    * A callback function accepts a collection of physicians.
    *
    * @param {function} error
    * An optional callback function that accepts a string representing an error
    * message.
    */
    var getPhysiciansByLocation = function(id, success, error) {
      getPhysicians(function(physicians) {
        var results = physicians.filter(function(physician) {
          return physician.location.id == id;
        });

        success(results);
      });
    };

    /**
    * @ngdoc method
    * @name $api#getPhysiciansBySpecialty
    *
    * @description
    * Retrieves a collection of physicians that belong to the given specialty id.
    *
    * @param {number} id
    * The specialty id.
    *
    * @param {function} success
    * A callback function accepts a collection of physicians.
    *
    * @param {function} error
    * An optional callback function that accepts a string representing an error
    * message.
    */
    var getPhysiciansBySpecialty = function(id, success, error) {
      getPhysicians(function(physicians) {
        var results = physicians.filter(function(physician) {
          return physician.specialties.some(function(specialty) {
            return specialty.id == id;
          });
        });

        success(results);
      });
    };

    /**
    * @ngdoc method
    * @name $api#getPhysiciansByInsurance
    *
    * @description
    * Retrieves a collection of physicians that belong to the given insurance id.
    *
    * @param {number} id
    * The insurance id.
    *
    * @param {function} success
    * A callback function accepts a collection of physicians.
    *
    * @param {function} error
    * An optional callback function that accepts a string representing an error
    * message.
    */
    var getPhysiciansByInsurance = function(id, success, error) {
      getPhysicians(function(physicians) {
        var results = physicians.filter(function(physician) {
          return physician.insurances.some(function(insurance) {
            return insurance.id == id;
          });
        });

        success(results);
      });
    };

    /**
    * @ngdoc method
    * @name $api#getPhysicianById
    *
    * @description
    * Retrieves a single physician object with the given id.
    *
    * @param {number} id
    * The physician id.
    *
    * @param {function} success
    * A callback function accepts a physician object.
    *
    * @param {function} error
    * An optional callback function that accepts a string representing an error
    * message.
    */
    var getPhysicianById = function(id, success, error) {
      getPhysicians(function(physicians) {
        var results = physicians.filter(function(physician) {
          return physician.id == id;
        });

        if (results[0])
          success(results[0]);
        else
          success({});
      });
    };

    /**
    * @ngdoc method
    * @name $api#getLocationsByType
    *
    * @description
    * Retrieves a collection of locations of the given type.
    *
    * @param {string} type
    * The type of locations to retrieve (e.g. 'Urgent Care').

    * @param {function} success
    * A callback function accepts a collection of locations.
    *
    * @param {function} error
    * An optional callback function that accepts a string representing an error
    * message.
    */
    var getLocationsByType = function(type, success, error) {
      getLocations(function(locations) {
        var results = locations.filter(function(location) {
          return location.type === type;
        });

        success(results);
      });
    };

    /**
    * @ngdoc method
    * @name $api#getLocationById
    *
    * @description
    * Retrieves a single location object with the given id.
    *
    * @param {number} id
    * The location id.
    *
    * @param {function} success
    * A callback function accepts a location object.
    *
    * @param {function} error
    * An optional callback function that accepts a string representing an error
    * message.
    */
    var getLocationById = function(id, success, error) {
      getLocations(function(locations) {
        var results = locations.filter(function(location) {
          return location.id == id;
        });

        if (results[0])
          success(results[0]);
        else
          success({});
      });
    };

    /**
    * @ngdoc method
    * @name $api#getLocationsWithDistances
    *
    * @description
    * Retrieves the location of the device and retrives a collection of
    * locations with an additional 'distance' attribute which represent the
    * distance (in miles) between the device and the location.
    *
    * @param {function} success
    * A callback function accepts a collection of locations.
    *
    * @param {function} error
    * An optional callback function that accepts a string representing an error
    * message.
    */
    var getLocationsWithDistances = function(success, error) {
      $geo.getCurrentPosition(function(position) {
        getLocations(function(locations) {
          locations.forEach(function(location) {
            distance = $geo.getDistanceInMiles(position.coords.latitude,
                                               position.coords.longitude,
                                               location.lat,
                                               location.lon);
            location.distance = distance;
          });

          success(locations);
        });
      });
    };

    /**
    * @ngdoc method
    * @name $api#getLocations
    *
    * @description
    * A convenience method that wraps an $http.get request to retrieve a
    * collection of locations.
    *
    * @param {function} success
    * A passthrough to angular's HttpPromise success method. Accepts the
    * following arguments: data, status, headers, config.
    *
    * @param {function} error
    * A passthrough to angular's HttpPromise error method. Accepts the
    * following arguments: data, status, headers, config.
    */
    var getLocations = function(success, error) {
      $http.get('/api/locations.json')
           .success(success)
           .error(error);
    };

    /**
    * @ngdoc method
    * @name $api#getSpecialties
    *
    * @description
    * A convenience method that wraps an $http.get request to retrieve a
    * collection of specialties.
    *
    * @param {function} success
    * A passthrough to angular's HttpPromise success method. Accepts the
    * following arguments: data, status, headers, config.
    *
    * @param {function} error
    * A passthrough to angular's HttpPromise error method. Accepts the
    * following arguments: data, status, headers, config.
    */
    var getSpecialties = function(success, error) {
      $http.get('/api/specialties.json')
           .success(success)
           .error(error);
    };

    /**
    * @ngdoc method
    * @name $api#getInsurances
    *
    * @description
    * A convenience method that wraps an $http.get request to retrieve a
    * collection of insurances.
    *
    * @param {function} success
    * A passthrough to angular's HttpPromise success method. Accepts the
    * following arguments: data, status, headers, config.
    *
    * @param {function} error
    * A passthrough to angular's HttpPromise error method. Accepts the
    * following arguments: data, status, headers, config.
    */
    var getInsurances = function(success, error) {
      $http.get('/api/insurances.json')
           .success(success)
           .error(error);
    };

    /**
    * @ngdoc method
    * @name $api#getPhysicians
    *
    * @description
    * A convenience method that wraps an $http.get request to retrieve a
    * collection of physicians.
    *
    * @param {function} success
    * A passthrough to angular's HttpPromise success method. Accepts the
    * following arguments: data, status, headers, config.
    *
    * @param {function} error
    * A passthrough to angular's HttpPromise error method. Accepts the
    * following arguments: data, status, headers, config.
    */
    var getPhysicians = function(success, error) {
      $http.get('/api/physicians.json')
           .success(success)
           .error(error);
    };

    return {
      getLocationsWithDistances: getLocationsWithDistances,
      getPhysiciansByLocation: getPhysiciansByLocation,
      getPhysiciansBySpecialty: getPhysiciansBySpecialty,
      getPhysiciansByInsurance: getPhysiciansByInsurance,
      getPhysicianById: getPhysicianById,
      getLocationsByType: getLocationsByType,
      getLocationById: getLocationById,
      getLocations: getLocations,
      getSpecialties: getSpecialties,
      getInsurances: getInsurances,
      getPhysicians: getPhysicians
    };
  })
;
