'use strict'

var app = window.angular.module('app', ['ui.router'])

var config = function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'home'
    })

  $urlRouterProvider.otherwise('home')
}
app.config(['$stateProvider', '$urlRouterProvider', config])
