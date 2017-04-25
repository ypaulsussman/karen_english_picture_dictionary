myApp.controller('AdminController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateAdminRole();
  $scope.userName = UserService.user;
  ItemService.getAllItems();
  $scope.allItems = ItemService.allItems;
  var editing = false;

  //@TODO: abstract to UserService factory (prevent repetition with studentController)
  $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };

  //sets dropdown & input fields for create/edit bar
  $scope.themes = ('The Classroom; Months & Weather; My Apartment; Numbers; Travelling').split('; ').map(function(theme) {
    return {
      name: theme
    };
  });

  $scope.clearFields = function functionName() {
    $scope.itemTheme = '';
    $scope.itemEN = '';
    $scope.itemKN = '';
    $scope.itemPron = '';
    $scope.itemURL = '';
  };

//submits a new/edited item
  var item = {};
  $scope.sendItem = function() {
    item.itemTheme = $scope.itemTheme;
    item.itemURL = $scope.itemURL;
    item.itemEN = $scope.itemEN;
    item.itemKN = $scope.itemKN;
    item.itemPron = $scope.itemPron;
    if (editing) {
      editing = false;
      item.id = $scope.itemID;
      ItemService.updateItem(item);
    } else {
      ItemService.addItem(item);
    }
    $scope.clearFields();
  }; //end logItem

//grabs an item for editing
  $scope.editItem = function(item) {
    editing = true;
    $scope.itemTheme = item.item_theme;
    $scope.itemEN = item.item_answer_en;
    $scope.itemKN = item.item_answer_kn;
    $scope.itemPron = item.item_answer_phon_kn;
    $scope.itemURL = item.item_prompt;
    $scope.itemID = item.id;
  };


//limits number of items appearing inside grid
  $scope.query = {
    order: 'name',
    limit: 50,
    page: 1
  };


}]); //end controller
