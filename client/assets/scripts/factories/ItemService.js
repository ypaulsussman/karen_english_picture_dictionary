myApp.factory('ItemService', ['$http', '$location', function($http, $location) {
  var allItems = {};
  var themedItems = {};
  var entryItem={};
  var iterator = 0;
  var testItem = {};

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

  var themes = [{name: 'The Classroom', nameKN: 'wDR \'X;' }, { name: 'Months and Weather',
      nameKN: 'rlcd. uvHR oD. *DR' }, { name: 'At Home', nameKN: '[H. \'X; zSd.' },
      {name: 'Numbers', nameKN: 'eD. *H>' }, { name: 'Travelling', nameKN: 'w> vJR w> uhR' }, ];

  function routeToTheme(theme, takingTest) {
    console.log('testing registers: ', takingTest);
    if (takingTest) {
      $location.path("/question");
    } else {
      $location.path("/theme");
    }
    getThemedItems(theme, takingTest);
  }

  function getThemedItems(theme, takingTest) {
    var themeID = theme.name;
    $http.get('/items/themed/'+themeID).then(function(response) {
      themedItems.items = response.data;
    }).then(function() {
      if (takingTest) {
        beginTest(themedItems);
      }
    });
  }

  function openEntry(item) {
    $location.path("/entry");
    entryItem.item = item;
  }

  //@TODO: if you don't expand this function, you can replace it in the HTML with an <a> tag
  function backToThemes() {
    $location.path("/student");
  }

  function beginTest(themedItems) {
    //randomizes array
    themedItems.items.sort(function(a, b){
      return 0.5 - Math.random();
    });
    console.log('your first test item: ', themedItems.items[iterator]);
    //go through each item in items and add 3 more properties: 'distractor1', 'distractor2', 'distractor3'
    testItem.current = themedItems.items[iterator];
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
    openEntry: openEntry,
    entryItem: entryItem,
    backToThemes: backToThemes,
    testItem: testItem,
  }; //end return

}]); //end ItemService
