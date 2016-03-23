'use strict'

router.$inject = ['$stateProvider', '$urlRouterProvider']

export default function router ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: require('home.template.html'),
      controller: 'Home',
      controllerAs: 'home'
    })

  $urlRouterProvider.otherwise('/')
}
