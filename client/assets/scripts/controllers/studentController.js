myApp.controller('StudentController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateStudentRole();
  $scope.userName = UserService.user;
  $scope.logout = UserService.logout;

  $scope.themes = ItemService.themes;
  $scope.routeToTheme = ItemService.routeToTheme;
  $scope.routeToSearch = ItemService.routeToSearch;

  // These exist to compensate for the weird first-use latency in
  // assigning the proper voice to SpeechSynthesis; it ensures that the
  // readEntry() function runs once, silently, before any entries are loaded, thus
  // clearing the (terrible) default male voice.
  $scope.readEntry = ItemService.readEntry;
  $scope.readEntry();
}]);
