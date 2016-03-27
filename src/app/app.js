'use strict'

// Assets
// import '../assets/css/main.css'

// App
import angular from 'angular'
import uiRouter from 'angular-ui-router'
var app = angular.module('app', [uiRouter])

// Directives
import greeting from 'greeting.directive'
import metadata from 'metadata.directive'
app.directive('greeting', greeting)
app.directive('metadata', metadata)

// Config
import router from 'app.router'
app.config(router)

// Services
import RandomNames from 'RandomNames.service'
app.service('RandomNames', RandomNames)

// Controllers
import HomeController from 'HomeController.controller'
app.controller('HomeController', HomeController)

export default app.name
