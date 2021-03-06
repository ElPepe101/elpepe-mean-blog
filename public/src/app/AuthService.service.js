'use strict'

export default class AuthService {
  constructor ($http, $q, $window) {
    if (!$http || !$q || !$window) throw new Error('Dependencies not valid.')

    this.$http = $http
    this.$q = $q
    this.$window = $window
    this.storage = 'elpepe-blog-token'
  }

  saveToken (token) {
    if (typeof token !== 'string') throw new Error('Token not a valid string')

    this.$window.localStorage[this.storage] = token
  }

  getToken () {
    return this.$window.localStorage[this.storage]
  }

  isLoggedIn () {
    var token = this.getToken()
    // If a token exists, we'll need to check the payload to see if the token has expired,
    // otherwise we can assume the user is logged out.
    if (!token) return false

    // The payload is the middle part of the token between the two '.'s.
    // It's a JSON object that has been base64'd.
    var payload = JSON.parse(this.$window.atob(token.split('.')[1]))

    return payload.exp > Date.now() / 1000
  }

  currentUser () {
    if (this.isLoggedIn()) {
      var token = this.getToken()
      var payload = JSON.parse(this.$window.atob(token.split('.')[1]))

      return payload.username
    }
  }

  register (user) {
    var success = function (data) {
      this.saveToken(data.token)
    }.bind(this)

    return this.$http.post('/register', user).success(success)
  }

  logIn (user) {
    var success = function (data) {
      this.saveToken(data.token)
    }.bind(this)

    var error = function (data) {
      this.error = data
    }.bind(this)

    return this.$http.post('/login', user).success(success).error(error)
  }

  logOut () {
    this.$window.localStorage.removeItem(this.storage)
  }
}

AuthService.$inject = ['$http', '$q', '$window']
