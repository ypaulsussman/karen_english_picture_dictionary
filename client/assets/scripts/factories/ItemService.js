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

  function deleteItem(item) {
    var removeID = item.id;
    $http.delete('/items/delete/'+removeID).then(function() {
      getAllItems();
    });
  }

function getThemes() {
  $http.get('/items/themes').then(function(response) {
    console.log(response.data);
    allItems.items = response.data;
  });
}

  var themes = [
    {name: 'The Classroom', nameKN: 'wDR \'X;'},
    {name: 'Months & Weather', nameKN:'rlcd. uvHR oD. *DR' },
    {name: 'My Apartment',nameKN:  '[H. \'X; zSd.'},
    {name: 'Numbers',nameKN: 'eD. *H>'},
    {name: 'Travelling', nameKN: 'w> vJR w> uhR'},];

  // ('The Classroom; Months & Weather; My Apartment; Numbers; Travelling').split('; ').map(function(theme) {
  //   return {
  //     name: theme
  //   };
  // });

  return {
    getAllItems: getAllItems,
    allItems: allItems,
    addItem: addItem,
    updateItem: updateItem,
    deleteItem: deleteItem,
    getThemes: getThemes,
    themes:themes,
  }; //end return

}]); //end ItemService
