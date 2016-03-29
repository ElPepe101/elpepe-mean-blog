'use strict'

export default class PostsService {
  constructor ($http, AuthService) {
    this.posts = []
    this.$http = $http
    this.AuthService = AuthService
  }

  getAll () {
    // fetch posts from model
    var success = function (data) {
      angular.copy(data, this.posts)
    }.bind(this)

    return this.$http.get('/posts').success(success)
  }

  create (post) {
    var success = function (data) {
      this.posts.push(data)
    }.bind(this)

    return this.$http.post('/posts', post, {
      headers: {Authorization: 'Bearer ' + this.AuthService.getToken()}
    }).success(success)
  }

  upvote (post) {
    var success = function (data) {
      post.upvotes += 1
    }

    return this.$http.put('/posts/' + post._id + '/upvote', null, {
      headers: {Authorization: 'Bearer ' + this.AuthService.getToken()}
    }).success(success)
  }

  getPost (id) {
    var getPost = function (res) {
      return res.data
    }

    return this.$http.get('/posts/' + id).then(getPost)
  }

  addPostComment (id, comment) {
    return this.$http.post('/posts/' + id + '/comments', comment, {
      headers: {Authorization: 'Bearer ' + this.AuthService.getToken()}
    })
  }

  upvoteComment (post, comment) {
    var success = function (data) {
      comment.upvotes += 1
    }

    return this.$http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
      headers: {Authorization: 'Bearer ' + this.AuthService.getToken()}
    }).success(success)
  }
}

PostsService.$inject = ['$http', 'AuthService']
