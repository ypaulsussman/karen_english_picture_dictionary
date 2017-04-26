myApp.controller('ThemeController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateStudentRole();
  $scope.userName = UserService.user;

  $scope.themedItems = ItemService.themedItems;
  console.log('inside controller: ', $scope.themedItems);
}]);
