var passport = require('passport')

var login = {}

// ···································· Post Login
login.login = function (req, res, next) {
  if (!req.body.username || !req.body.password) return res.status(400).json({message: 'Please fill out all fields.'})

  var authenticate = function (err, user, info) {
    if (err) return next(err)
    if (user) return res.json({token: user.generateJWT()})
    else return res.status(401).json(info)
  }
  passport.authenticate('local', authenticate)(req, res, next)
}

module.exports = login
