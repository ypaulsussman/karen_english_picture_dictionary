myApp.factory('ItemService', ['$http', function($http) {
  var allItems = {};

  function getAllItems() {
    $http.get('/items').then(function(response) {
      allItems.items = response.data;
    });
  }

  function addItem(item) {
    var copy = angular.copy[item];
    $http.post('/items/add', item).then(function(response) {
      getAllItems();
    });
  }

  function updateItem(item) {
    var copy = angular.copy[item];
    console.log('new copied item at ItemService: ', item);
    $http.put('/items/update', item).then(function(response) {
      getAllItems();
    });
  }



  return {
    getAllItems: getAllItems,
    allItems: allItems,
    addItem: addItem,
    updateItem: updateItem,
  }; //end return

}]); //end ItemService
