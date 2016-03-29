'use strict'

export default function router ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: require('home.template.html'),
      controller: 'HomeController',
      controllerAs: 'home'
    })
    .state('posts', {
      url: '/posts/{id}',
      template: require('posts.template.html'),
      controller: 'PostsController',
      controllerAs: 'posts'
    })
    .state('login', {
      url: '/login',
      template: require('login.template.html'),
      controller: 'AuthController',
      controllerAs: 'auth',
      onEnter: [
        '$state',
        'Auth',
        function ($state, Auth) {
          if (Auth.isLoggedIn()) {
            $state.go('home')
          }
        }
      ]
    })
    .state('register', {
      url: '/register',
      template: require('register.template.html'),
      controller: 'AuthController',
      controllerAs: 'auth',
      onEnter: [
        '$state',
        'Auth',
        function ($state, Auth) {
          if (Auth.isLoggedIn()) {
            $state.go('home')
          }
        }
      ]
    })

  $urlRouterProvider.otherwise('/')
}

router.$inject = ['$stateProvider', '$urlRouterProvider']
