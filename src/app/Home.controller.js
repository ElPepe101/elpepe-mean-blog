'use strict'

import RandomNames from 'randomNames.service.js'

export default class Home {
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

Home.$inject = ['RandomNames']
