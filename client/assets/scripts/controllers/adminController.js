myApp.controller('AdminController', ['$scope', '$http', '$location', '$mdDialog', 'ItemService', 'UserService', function($scope, $http, $location, $mdDialog, ItemService, UserService) {
  UserService.validateAdminRole();
  $scope.userName = UserService.user;
  $scope.logout = UserService.logout;

  ItemService.getAllItems();
  $scope.allItems = ItemService.allItems;
  var editing = false;


  $scope.themes = ItemService.themes;

  //sets input fields for create/edit form
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
    if (!$scope.itemTheme || !$scope.itemEN || !$scope.itemKN || !$scope.itemPron || !$scope.itemURL) {
      console.log("please complete all items!");
      $scope.showAlert();
    } else {
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
    }
  };

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

  //popup if new/edited item has empty fields
  $scope.showAlert = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Please complete all fields!')
          .textContent('You can\'t leave any spaces empty.')
          .ariaLabel('Alert Dialog')
          .ok('OK!')
      );
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
    limit: 25,
    page: 1
  };


}]); //end controller
