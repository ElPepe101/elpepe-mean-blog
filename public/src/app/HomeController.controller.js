'use strict'

// ·············································
// ············ HOME CONTROLLER ················
export default class HomeController {
  constructor (PostsService, AuthService) {
    this.PostsService = PostsService
    this.PostsService.getAll()
    this.posts = this.PostsService.posts
    this.show = AuthService.isLoggedIn()
  }

  addPost () {
    if (!this.title || this.title === '') return

    this.PostsService.create(
      {
        title: this.title,
        link: this.link
      }
    )
    this.title = ''
    this.link = ''
  }

  incrementUpvotes (post) {
    this.PostsService.upvote(post)
  }
}

HomeController.$inject = ['PostsService', 'AuthService']
