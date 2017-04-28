myApp.controller('ThemeController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateStudentRole();
  $scope.userName = UserService.user;

  //@TODO: right now, refreshing the page clears all items: b/c the getThemedItems() function is only called by the routeToTheme() function.
  //How to pass the given theme to this controller, so that it can repeatedly call the themed items?

  $scope.themedItems = ItemService.themedItems;
  $scope.openEntry = ItemService.openEntry;

  $scope.allItems = ItemService.allItems;
  $scope.searchTerm = '';

  $scope.searchItems = function(nameValue) {
    if (nameValue.includes($scope.searchTerm) || nameValue.toUpperCase().includes($scope.searchTerm) || nameValue.toLowerCase().includes($scope.searchTerm)  ) {
      return true;
    } else {
      return false;
    }
  };

  $scope.backToThemes = ItemService.backToThemes;

}]);
