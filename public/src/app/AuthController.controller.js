'use strict'

// ··············································
// ············· AUTH CONTROLLER ················
export default class AuthController {
  constructor ($state, AuthService) {
    this.AuthService = AuthService
    this.$state = $state
  }

  register () {
    var error = function (error) {
      this.error = error
    }.bind(this)

    var then = function () {
      this.$state.go('home')
    }.bind(this)

    this.AuthService.register(this.user).error(error).then(then)
  }

  logIn () {
    var error = function (error) {
      this.error = error
    }.bind(this)

    var then = function () {
      this.$state.go('home')
    }.bind(this)

    this.AuthService.logIn(this.user).error(error).then(then)
  }
}

AuthController.$inject = ['$state', 'AuthService']
