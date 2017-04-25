myApp.factory('ItemService', ['$http', function($http) {
  var allItems = {};

  function getAllItems() {
    $http.get('/items').then(function(response) {
      allItems.items = response.data;
    });
  } //end getAllItems

  function saveItem(item) {
    console.log('new item at ItemService: ', item);
    var copy = angular.copy[item];
    $http.post('/items/add', item).then(function(response) {
      getAllItems();
    });
  }


  return {
    getAllItems: getAllItems,
    allItems: allItems,
    saveItem: saveItem,
  }; //end return

}]); //end ItemService
