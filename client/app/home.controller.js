'use strict'

var app = require('config')

var home = function () {
  var self = this

  self.test = function () {
    console.log('home: test')
  }
}
app.controller('home', home)
