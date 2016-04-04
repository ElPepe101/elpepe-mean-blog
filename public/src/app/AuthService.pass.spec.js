/* eslint-env mocha */

import {expect} from 'chai'
// import request from 'supertest'

import angular from 'angular'
import 'angular-mocks'

import AuthService from 'AuthService.service'

describe('Auth service', function () {
  var Auth

  // var url = 'http://localhost:7000'

  var $q
  var $http
  var $window
  var $httpBackend

  beforeEach(angular.mock.inject(function ($injector) {
    $q = $injector.get('$q')
    $http = $injector.get('$http')
    $window = $injector.get('$window')
    $httpBackend = $injector.get('$httpBackend')

    // $httpBackend.whenPOST('/login').passThrough()

    Auth = new AuthService($http, $q, $window)
  }))

  // this one helped to uncover the mock injection.
  // Now I got it, but I want to keep it as a reminder
  it('should start with an implentation of $http, $q and $window', function () {
    expect(Auth.$http).to.be.equal($http).and.not.to.be.undefined
    expect(Auth.$q).to.be.equal($q).and.not.to.be.undefined
    expect(Auth.$window).to.be.equal($window).and.not.to.be.undefined
  })

  it('should store a string on localStorage after call saveToken', function () {
    Auth.saveToken('sample')
    expect(Auth.getToken()).to.equal(window.localStorage[Auth.storage]).and.to.be.a('string')
  })

  it('should remove a string on localStorage after call logOut', function () {
    Auth.logOut()
    expect(Auth.getToken()).to.be.undefined
  })

  /*
  describe('Login process', function () {
    it('should get an error message if the username or password is incorrect', function (done) {
      Auth.logIn({
        username: '',
        password: ''
      })

      expect(Auth.error).to.equals('Please fill out all fields.')
    })

    it('should retrieve a token on succesful log in', function () {
      Auth.logIn({
        username: '',
        password: ''
      })

      expect(Auth.error).to.equals('')
      expect(Auth.getToken()).to.equal(window.localStorage[Auth.storage]).and.to.be.a('string')
    })
  })
  */
})
