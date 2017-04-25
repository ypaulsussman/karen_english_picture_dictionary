myApp.controller('AdminController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateAdminRole();
  $scope.userName = UserService.user;
  ItemService.getAllItems();
  $scope.allItems = ItemService.allItems;

  //@TODO: abstract to UserService factory (prevent repetition with studentController)
  $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };

  //sets dropdown & input fields for create/edit bar
  $scope.themes = ('The Classroom; Months & Weather; My Apartment; Numbers; Transportation').split('; ').map(function (theme) { return { name: theme }; });

  $scope.clearFields = function functionName() {
    $scope.itemTheme = '';
    $scope.itemEN = '';
    $scope.itemKN = '';
    $scope.itemPron = '';
    $scope.itemURL = '';
  };

  //functionality for submitting new/edited item
  var item = {};
  $scope.addItem = function() {
    item.itemTheme = $scope.itemTheme;
    item.itemURL = $scope.itemURL;
    item.itemEN = $scope.itemEN;
    item.itemKN = $scope.itemKN;
    item.itemPron = $scope.itemPron;
    ItemService.saveItem(item);
    $scope.clearFields();
  };//end logItem

  //limits number of items appearing inside grid
  $scope.query = {
    order: 'name',
    limit: 50,
    page: 1
  };


}]);//end controller
