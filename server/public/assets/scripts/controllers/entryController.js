myApp.controller('EntryController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateStudentRole();
  $scope.userName = UserService.user;
  $scope.testWebSpeech = ItemService.testWebSpeech;

  $scope.entryItem = ItemService.entryItem;

  $scope.routeToTheme = ItemService.routeToTheme;
  $scope.searching = ItemService.searching;
  $scope.routeToSearch = ItemService.routeToSearch;

  $scope.studying = ItemService.studying;
  $scope.addStudyItem = ItemService.addStudyItem;
  $scope.removeStudyItem = ItemService.removeStudyItem;

  $scope.readEntry = ItemService.readEntry;

  $scope.exitEntry = function() {
      if ($scope.searching.now) {
        $scope.routeToSearch();
      } else if ($scope.studying.now) {
        $scope.routeToTheme({name: 'list'}, false, $scope.userName.id);
      } else {
        $scope.routeToTheme({name: $scope.entryItem.item.item_theme});
      }
  };

}]);
