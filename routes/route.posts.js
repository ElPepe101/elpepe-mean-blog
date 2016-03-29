var mongoose = require('mongoose')
var Post = mongoose.model('Post')
var Comment = mongoose.model('Comment')

var posts = {
  param: {},
  post: {},
  put: {},
  get: {},
  delete: {}
}

// ···································· Params
posts.param.post = function (req, res, next, id) {
  var query = Post.findById(id)
  var queryExec = function (err, post) {
    if (err) return next(err)
    if (!post) return next(new Error('can\'t find post'))

    req.post = post

    return next()
  }
  query.exec(queryExec)
}

posts.param.comment = function (req, res, next, id) {
  var query = Comment.findById(id)
  var queryExec = function (err, comment) {
    if (err) return next(err)
    if (!comment) return next(new Error('can\'t find comment'))

    req.comment = comment

    return next()
  }
  query.exec(queryExec)
}

// ···································· Get Posts
// curl http://localhost:3000/posts
posts.get.posts = function (req, res, next) {
  Post.find(function (err, posts) {
    if (err) return next(err)

    res.json(posts)
  })
}

// ···································· Get Post
// curl http://localhost:3000/posts/<POST ID>
posts.get.post = function (req, res, next) {
  var reqPost = function (err, post) {
    if (err) return next(err)

    res.json(post)
  }
  req.post.populate('comments', reqPost)
}

// ···································· Post Posts
// curl --data 'title=test&link=http://test.com' http://localhost:3000/posts
posts.post.posts = function (req, res, next) {
  var post = new Post(req.body)
  post.author = req.payload.username

  var postSave = function (err, post) {
    if (err) return next(err)

    res.json(post)
  }
  post.save(postSave)
}

// ···································· Put Post Upvote
// curl -X PUT http://localhost:3000/posts/<POST ID>/upvote
posts.put.postUpvote = function (req, res, next) {
  var reqPostUpvote = function (err, post) {
    if (err) return next(err)

    res.json(post)
  }
  req.post.upvote(reqPostUpvote)
}

// ···································· Post Post Comments
// curl -X PUT http://localhost:3000/posts/<POST ID>/comments
posts.post.postComments = function (req, res, next) {
  var comment = new Comment(req.body)
  comment.post = req.post
  comment.author = req.payload.username

  var CommentSave = function (err, comment) {
    if (err) return next(err)

    req.post.comments.push(comment)
    var reqPostSave = function (err, post) {
      if (err) return next(err)

      res.json(comment)
    }
    req.post.save(reqPostSave)
  }
  comment.save(CommentSave)
}

// ···································· Put Post Comment Upvote
// curl -X PUT http://localhost:3000/posts/<POST ID>/comments/<COMMENT ID>/upvote
posts.put.postCommentUpvote = function (req, res, next) {
  var reqPostCommentUpvote = function (err, comment) {
    if (err) return next(err)

    res.json(comment)
  }
  // console.log(req.comment)
  req.comment.upvote(reqPostCommentUpvote)
}

module.exports = posts
