var home = {}

// ···································· Get HOME TEMPLATE
home.getHome = function (req, res) {
  res.render('index', { title: 'Express Home' })
}

module.exports = home
