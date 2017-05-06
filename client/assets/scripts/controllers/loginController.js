myApp.controller('LoginController', ['$scope', '$http', '$location', '$mdDialog', 'UserService', function($scope, $http, $location, $mdDialog, UserService) {
  $scope.go = UserService.go;
  $scope.loginAlert = UserService.loginAlert;
  $scope.user = UserService.user;
  $scope.login = UserService.login;
  $scope.registerUser = UserService.registerUser;
}]);
