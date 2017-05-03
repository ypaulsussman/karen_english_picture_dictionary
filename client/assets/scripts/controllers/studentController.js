myApp.controller('StudentController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateStudentRole();
  $scope.userName = UserService.user;
  console.log("here's the data we have at the StudentController: ", $scope.userName);
  $scope.logout = UserService.logout;

  $scope.themes = ItemService.themes;
  $scope.routeToTheme = ItemService.routeToTheme;
  $scope.routeToSearch = ItemService.routeToSearch;

}]);
