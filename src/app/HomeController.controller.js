'use strict'

export default class HomeController {
  constructor (RandomNames) {
    this.random = RandomNames
    this.name = 'World'
  }

  changeName () {
    this.name = 'angular-tips'
  }

  randomName () {
    this.name = this.random.getName()
  }
}

HomeController.$inject = ['RandomNames']
