/* eslint-env mocha */

// import app from './app'
import {expect} from 'chai'
import HomeController from 'HomeController.controller'
import RandomNames from 'RandomNames.service'

describe('Home controller', function () {
  var home

  beforeEach(function () {
    home = new HomeController(new RandomNames())
  })

  it('should start with the name "World"', function () {
    expect(home.name).to.equal('World')
  })

  it('should change value to "angular-tips" on changeName', function () {
    home.changeName()
    expect(home.name).to.equal('angular-tips')
  })

  it('should change value to one in [John, Elisa, Mark, Annie] on randomName', function () {
    home.randomName()
    console.log(home.name)
    expect(home.name).to.match(/\bJohn\b|\bElisa\b|\bMark\b|\bAnnie\b/)
  })
})
