'use strict'

// Assets
import '../assets/css/main.css'

// App
var app = window.angular.module('app', ['ui.router'])

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
