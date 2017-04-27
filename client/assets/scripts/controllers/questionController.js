myApp.controller('QuestionController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateStudentRole();
  $scope.userName = UserService.user;
  $scope.backToThemes = ItemService.backToThemes;

  $scope.testItem = ItemService.testItem;
  $scope.getAnswer = ItemService.getAnswer;

}]);
