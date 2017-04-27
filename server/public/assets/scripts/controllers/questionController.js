myApp.controller('QuestionController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateStudentRole();
  $scope.userName = UserService.user;
  $scope.backToThemes = ItemService.backToThemes;

  $scope.testItem = ItemService.testItem;

  $scope.getAnswer = function(answer) {
    console.log("here's answer inside function: ", answer);
    console.log("here's what we want?  ", $scope.testItem.current.qOptions[answer]);
    if ($scope.testItem.current.qOptions[answer] === $scope.testItem.current.item_answer_en){
      console.log("true");
    } else {
      console.log("false");
    }
  };











}]);
