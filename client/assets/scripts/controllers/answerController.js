myApp.controller('AnswerController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateStudentRole();
  $scope.userName = UserService.user;
  $scope.testWebSpeech = ItemService.testWebSpeech;

  $scope.testItem = ItemService.testItem;
  $scope.nextTestItem = ItemService.nextTestItem;
  $scope.answerMeta = ItemService.answerMeta;

  $scope.studying = ItemService.studying;
  $scope.addStudyItem = ItemService.addStudyItem;
  $scope.readEntry = ItemService.readEntry;
  $scope.backToThemes = ItemService.backToThemes;


}]);
