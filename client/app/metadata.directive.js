'use strict'

var app = require('config')

/**
 * Add defined meta tags to the HTML head,
 * the app must be on HTML scope.
 * IMPORTANT: Needs an static html render for all scrappers to be able to read meta tags.
 * @TODO Simplify meta tags creations
 * @TODO Add example of router metadata
 * @TODO Add example of attr usage
 * @param  {Object} $rootScope Angular Router scope injection
 * @return {Object}
 */
var metadata = function ($rootScope) {
  // Directive link function
  var link = function (scope, elem, attr) {
    // Event: route changed
    var routeChangeSuccess = function (event, currentRoute) {
      // If metadata defined in router
      if (currentRoute.$$route && currentRoute.$$route.metadata) {
        scope.metas = currentRoute.$$route.metadata
      }
    }
    // Suscribe to angular event
    $rootScope.$on('$routeChangeSuccess', routeChangeSuccess)
  }

  return {
    restrict: 'A',
    template: '<meta property="{{ meta.property }}" content="{{ meta.content }}" ng-repeat="meta in metas" />',
    replace: true,
    scope:
      {
        // https://docs.angularjs.org/error/$compile/nonassign
        metas: '@?meta'
      },
    link: link
  }
}
// Register angular directive
app.directive('metadata', ['$rootScope', metadata])
