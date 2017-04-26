myApp.controller('QuestionController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateStudentRole();
  $scope.userName = UserService.user;
  $scope.backToThemes = ItemService.backToThemes;

  $scope.testItem = ItemService.testItem;
  console.log('as you load controller, the testItem is: ', $scope.testItem);












}]);
