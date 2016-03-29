var express = require('express')
var router = express.Router()

var jwt = require('express-jwt')
var auth = jwt({secret: process.env.SECRET, userProperty: 'payload'})

var register = require('./register')
var login = require('./login')
var home = require('./home')
var posts = require('./posts')

// REGISTER
router.post('/register', register.register)

// LOGIN
router.post('/login', login.login)

// HOME
router.get('/', home.getHome)

// POSTS
router.param('post', posts.paramPost)
router.param('comment', posts.paramComment)
router.get('/posts', posts.getPosts)
router.get('/posts/:post', posts.getPost)
router.post('/posts', auth, posts.postPosts)
router.put('/posts/:post/upvote', auth, posts.putPostUpvote)
router.post('/posts/:post/comments', auth, posts.postPostComments)
router.put('/posts/:post/comments/:comment/upvote', auth, posts.putPostCommentUpvote)

module.exports = router
