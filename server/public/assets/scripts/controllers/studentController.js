myApp.controller('StudentController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateStudentRole();
  $scope.userName = UserService.user;
  $scope.logout = UserService.logout;

  $scope.themes = ItemService.themes;
  $scope.routeToTheme = ItemService.routeToTheme;

}]);
