var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'md.data.table']);
/// Routes ///

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "LoginController"
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: "LoginController"
    })
    .when('/student', {
      templateUrl: '/views/student.html',
      controller: "StudentController"
    })
    .when('/admin', {
      templateUrl: '/views/admin.html',
      controller: "AdminController"
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);
