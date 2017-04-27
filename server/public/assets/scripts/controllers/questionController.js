myApp.controller('QuestionController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateStudentRole();
  $scope.userName = UserService.user;
  $scope.backToThemes = ItemService.backToThemes;

  $scope.testItem = ItemService.testItem;

  $scope.getAnswer = function(answer) {
    if ($scope.testItem.current.qOptions[answer] === $scope.testItem.current.item_answer_en){
      $location.path("/answer");
    } else {
      $location.path("/answer");
    }
  };











}]);
