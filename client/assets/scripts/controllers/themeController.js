myApp.controller('EntryController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  console.log('checking user');
  UserService.validateStudentRole();
  $scope.userName = UserService.user;


}]);
