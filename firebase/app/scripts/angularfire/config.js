angular.module('firebase.config', [])
  .constant('FBURL', 'https://dash-proposals.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password'])

  .constant('loginRedirectPath', '/login');
