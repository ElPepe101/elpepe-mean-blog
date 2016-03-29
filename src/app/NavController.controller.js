
export default class NavController {
  constructor (AuthService) {
    this.isLoggedIn = AuthService.isLoggedIn()
    this.currenUser = AuthService.currentUser()
    this.links = [
      {
        show: this.isLoggedIn,
        text: this.currentUser,
        href: '',
        click: null
      },
      {
        show: this.isLoggedIn,
        text: 'Log Out',
        href: '',
        click: AuthService.logOut
      },
      {
        show: !this.isLoggedIn,
        text: 'Log In',
        href: '/#/login',
        click: null
      },
      {
        show: !this.isLoggedIn,
        text: 'Register',
        href: '/#/register',
        click: null
      }
    ]
  }
}

NavController.$inject = ['AuthService']
