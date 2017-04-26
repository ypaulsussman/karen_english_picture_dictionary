myApp.controller('EntryController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateStudentRole();
  $scope.userName = UserService.user;

  $scope.entryItem = ItemService.entryItem;
  $scope.routeToTheme = ItemService.routeToTheme;

  $scope.backToItems = function() {
    var theme = {};
    theme.name = $scope.entryItem.item.item_theme;
    $scope.routeToTheme(theme);
  };
}]);