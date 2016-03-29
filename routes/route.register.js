var mongoose = require('mongoose')
var User = mongoose.model('User')

var register = {
  param: {},
  post: {},
  put: {},
  get: {},
  delete: {}
}

// ···································· Post Register
register.post.register = function (req, res, next) {
  if (!req.body.username || !req.body.password) return res.status(400).json({message: 'Please fill out all fields.'})

  var user = new User()
  user.username = req.body.username
  user.setPassword(req.body.password)

  var save = function (err) {
    if (err) return next(err)

    return res.json({token: user.generateJWT()})
  }
  user.save(save)
}

module.exports = register
