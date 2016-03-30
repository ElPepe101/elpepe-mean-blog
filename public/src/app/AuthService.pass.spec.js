/* eslint-env mocha */

import {expect} from 'chai'

import angular from 'angular'
import 'angular-mocks'

import AuthService from 'AuthService.service'

describe('Auth service', function () {
  var Auth

  var mock = angular.mock
  var $q
  var $window
  var $httpBackend

  beforeEach(mock.inject(function (_$httpBackend_, _$q_, _$window_) {
    $q = _$q_
    $window = _$window_
    $httpBackend = _$httpBackend_

    Auth = new AuthService($httpBackend, $q, $window)
  }))

  it('should start with an implentation of $http, $q and $window', function () {
    expect(Auth.$http).to.be.equal($httpBackend).and.not.to.be.undefined
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

  describe('Login process', function () {
    var mockUser = {
      username: '',
      password: ''
    }

    /* it('should send an object', function () {
      var uri = '/login'
      $httpBackend.expectPOST(uri, mockUser).respond(201, {})
    })*/

    it('should get an error message if the username or password is incorrect', function () {
      var uri = '/login'
      $httpBackend.expectPOST(uri, mockUser).respond(200, {})
    })

    /* it('should retrieve a token on succesful log in', function () {
      Auth.login(mockUser)
    })*/
  })
})
