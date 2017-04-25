myApp.controller('AdminController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateAdminRole();
  $scope.userName = UserService.user;
  ItemService.getAllItems();
  $scope.allItems = ItemService.allItems;
  console.log($scope.allItems, '  is scoped!');

  $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };//end logout

  $scope.themes = ('The Classroom; Months & Weather; My Apartment; Numbers; Transportation').split('; ').map(function (theme) { return { name: theme }; });
    var item = {};

    $scope.itemTheme = '';
    $scope.itemURL = '';
    $scope.itemEN = '';
    $scope.itemKN = '';
    $scope.itemPron = '';

    $scope.logItem = function() {
      item.itemTheme = $scope.itemTheme;
      item.itemURL = $scope.itemURL;
      item.itemEN = $scope.itemEN;
      item.itemKN = $scope.itemKN;
      item.itemPron = $scope.itemPron;
      console.log(item);
      console.log('suuup');
    };//end logItem

    $scope.query = {
      order: 'name',
      limit: 50,
      page: 1
    };

  $scope.desserts = { "count": 9, "data": [ { "name": "Frozen yogurt", "type":
  "Ice cream", "calories": { "value": 159.0 }, "fat": { "value": 6.0 }, "carbs": {
  "value": 24.0 }, "protein": { "value": 4.0 }, "sodium": { "value": 87.0 },
  "calcium": { "value": 14.0 }, "iron": { "value": 1.0 } }, { "name": "Ice cream sandwich", "type": "Ice cream", "calories": { "value": 237.0 }, "fat": {
  "value": 9.0 }, "carbs": { "value": 37.0 }, "protein": { "value": 4.3 },
  "sodium": { "value": 129.0 }, "calcium": { "value": 8.0 }, "iron": { "value":
  1.0 } }, { "name": "Eclair", "type": "Pastry", "calories": { "value":  262.0 },
  "fat": { "value": 16.0 }, "carbs": { "value": 24.0 }, "protein": { "value":  6.0 },
  "sodium": { "value": 337.0 }, "calcium": { "value":  6.0 }, "iron": { "value":
  7.0 } } ] };//end scope.desserts

}]);//end controller
