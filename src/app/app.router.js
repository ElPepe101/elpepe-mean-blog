'use strict'

router.$inject = ['$stateProvider', '$urlRouterProvider']

export default function router ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: require('home.template.html'),
      controller: 'HomeController',
      controllerAs: 'home'
    })

  $urlRouterProvider.otherwise('/')
}
