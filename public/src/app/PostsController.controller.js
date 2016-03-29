'use strict'

// ·············································
// ············ POST CONTROLLER ················
export default class PostsController {
  constructor (PostsService, $stateParams, AuthService) {
    this.PostsService = PostsService
    this.post = this.PostsService.getPost($stateParams.id)
    console.log(this.post, this.post, $stateParams)
    this.show = AuthService.isLoggedIn()
  }

  addComment () {
    if (this.body === '') return
    var success = function (comment) {
      this.post.comments.push(comment)
    }

    this.PostsService.addPostComment(this.post._id,
      {
        body: this.body,
        author: 'user'
      }
    ).success(success)
    this.body = ''
  }

  incrementUpvotes (comment) {
    this.PostsService.upvoteComment(this.post, comment)
  }
}

PostsController.$inject = ['PostsService', '$stateParams', 'AuthService']
