/**
 * @ngdoc filter
 * @name capitalize
 *
 * @description
 * Returns a copy of input with the first character converted to uppercase.

 * @param {string} input The string to capitalize.
 *
 * @returns {string} A copy of input with the first character converted to
 *                   uppercase. 
 */
angular.module('starter.filters')
  .filter('capitalize', function() {
    var capitalize = function(input) {
      input = input || '';
      return input.charAt(0).toUpperCase() + input.slice(1);
    };

    return capitalize;
  })
;
