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
    .when('/admin', {
      templateUrl: '/views/admin.html',
      controller: "AdminController"
    })
    .when('/student', {
      templateUrl: '/views/student.html',
      controller: "StudentController"
    })
    .when('/search', {
      templateUrl: '/views/search.html',
      controller: "ThemeController"
    })
    .when('/theme', {
      templateUrl: '/views/theme.html',
      controller: "ThemeController"
    })
    .when('/entry', {
      templateUrl: '/views/entry.html',
      controller: "EntryController"
    })
    .when('/question', {
      templateUrl: '/views/question.html',
      controller: "QuestionController"
    })
    .when('/answer', {
      templateUrl: '/views/answer.html',
      controller: "AnswerController"
    })
    .when('/completed', {
      templateUrl: '/views/completed.html',
      controller: "AnswerController"
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);
