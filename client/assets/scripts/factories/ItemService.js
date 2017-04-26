myApp.factory('ItemService', ['$http', '$location', function($http, $location) {
  var allItems = {};
  var themedItems = {};

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
    $http.delete('/items/delete/' + removeID).then(function() {
      getAllItems();
    });
  }

  var themes = [{
      name: 'The Classroom',
      nameKN: 'wDR \'X;'
    },
    {
      name: 'Months and Weather',
      nameKN: 'rlcd. uvHR oD. *DR'
    },
    {
      name: 'At Home',
      nameKN: '[H. \'X; zSd.'
    },
    {
      name: 'Numbers',
      nameKN: 'eD. *H>'
    },
    {
      name: 'Travelling',
      nameKN: 'w> vJR w> uhR'
    },
  ];

  function routeToTheme(theme) {
    $location.path("/theme");
    getThemedItems(theme);
  }

  function getThemedItems(theme) {
    console.log("here's the theme: ", theme);
    var themeID = theme.name;
    $http.get('/items/themed/'+themeID).then(function(response) {
      console.log('you get this from the database: ', response.data);
      themedItems.items = response.data;
    });
  }

  return {
    getAllItems: getAllItems,
    allItems: allItems,
    addItem: addItem,
    updateItem: updateItem,
    deleteItem: deleteItem,
    themes: themes,
    routeToTheme: routeToTheme,
    themedItems: themedItems,
  }; //end return

}]); //end ItemService
