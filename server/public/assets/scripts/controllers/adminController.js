myApp.controller('AdminController', ['$scope', '$http', '$location', '$mdDialog', 'ItemService', 'UserService', function($scope, $http, $location, $mdDialog, ItemService, UserService) {
  UserService.validateAdminRole();
  $scope.userName = UserService.user;
  $scope.logout = UserService.logout;

  ItemService.getAllItems();
  $scope.allItems = ItemService.allItems;
  var editing = false;


  //sets dropdown for create/edit form @TODO: figure out *exactly* how .map is working here...
  $scope.themes = ItemService.themes;
  // ('The Classroom; Months & Weather; My Apartment; Numbers; Travelling').split('; ').map(function(theme) {
  //   return {
  //     name: theme
  //   };
  // });

  //sets input fields for create/edit form
  $scope.clearFields = function functionName() {
    $scope.itemTheme = '';
    $scope.itemEN = '';
    $scope.itemKN = '';
    $scope.itemPron = '';
    $scope.itemURL = '';
  };

  //submits a new/edited item. @TODO: create validation to ensure no partially-complete items.
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

  //displays an item for editing
  $scope.editItem = function(item) {
    editing = true;
    $scope.itemTheme = item.item_theme;
    $scope.itemEN = item.item_answer_en;
    $scope.itemKN = item.item_answer_kn;
    $scope.itemPron = item.item_answer_phon_kn;
    $scope.itemURL = item.item_prompt;
    $scope.itemID = item.id;
  };

  //sends an item to be deleted
  $scope.deleteItem = ItemService.deleteItem;

  $scope.showConfirm = function(item) {
    var confirm = $mdDialog.confirm()
      .title('Are you sure you want to delete this item?')
      .textContent('This will remove the item forever.')
      .ok('Yes')
      .cancel('No');
    $mdDialog.show(confirm).then(function() {
      $scope.deleteItem(item);
    });
  };


  //limits number of items appearing inside grid
  $scope.query = {
    order: 'name',
    limit: 50,
    page: 1
  };


}]); //end controller
