// import 'angular'
// import 'angular-mocks/angular-mocks'

var testsContext = require.context('./public/src', true, /.+\.spec\.js$/)
testsContext.keys().forEach(testsContext)
