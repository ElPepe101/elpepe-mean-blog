var express = require('express')
var router = express.Router()

var jwt = require('express-jwt')
var auth = jwt({secret: process.env.SECRET, userProperty: 'payload'})

var register = require('./route.register')
var login = require('./route.login')
var home = require('./route.home')
var posts = require('./route.posts')

// REGISTER
router.post('/register', register.post.register)

// LOGIN
router.post('/login', login.post.login)

// HOME
router.get('/', home.get.home)

// POSTS
router.param('post', posts.param.post)
router.param('comment', posts.param.comment)
router.get('/posts', posts.get.posts)
router.get('/posts/:post', posts.get.post)
router.post('/posts', auth, posts.post.posts)
router.put('/posts/:post/upvote', auth, posts.put.postUpvote)
router.post('/posts/:post/comments', auth, posts.post.postComments)
router.put('/posts/:post/comments/:comment/upvote', auth, posts.put.postCommentUpvote)

module.exports = router
