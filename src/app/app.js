'use strict'

// Assets
// import '../assets/css/main.css'

// App
import angular from 'angular'
import uiRouter from 'angular-ui-router'
var app = angular.module('app', [uiRouter])

// Directives
import metadata from 'metadata.directive'
app.directive('metadata', metadata)

// Config
import router from 'App.router'
app.config(router)

// Services
import AuthService from 'AuthService.service'
import PostsService from 'PostsService.service'
app.service('AuthService', AuthService)
app.service('PostsService', PostsService)

// Controllers
import AuthController from 'AuthController.controller'
import HomeController from 'HomeController.controller'
import PostsController from 'PostsController.controller'
import NavController from 'NavController.controller'
app.controller('AuthController', AuthController)
app.controller('HomeController', HomeController)
app.controller('PostsController', PostsController)
app.controller('NavController', NavController)

export default app.name
