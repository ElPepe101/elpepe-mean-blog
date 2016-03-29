var home = {
  param: {},
  post: {},
  put: {},
  get: {},
  delete: {}
}

// ···································· Get HOME TEMPLATE
home.get.home = function (req, res) {
  res.render('index', { title: 'Express Home' })
}

module.exports = home
