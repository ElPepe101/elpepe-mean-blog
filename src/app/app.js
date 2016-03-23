'use strict'

import '../assets/css/main.css'

var app = window.angular.module('app', ['ui.router'])

import router from 'app.router.js'
app.config(router)

import Home from 'Home.controller.js'
app.controller('Home', Home)

import greeting from 'greeting.directive.js'
app.directive('greeting', greeting)
