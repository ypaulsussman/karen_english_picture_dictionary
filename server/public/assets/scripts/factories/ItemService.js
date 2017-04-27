myApp.factory('ItemService', ['$http', '$location', function($http, $location) {
  var allItems = {};
  var themedItems = {};
  var entryItem={};
  var iterator = 0;
  var testItem = {};
  var distractorNum = 0;
  var includedItems = [];

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
    themedItems.items.sort(randomizeArray());
    for (var i = 0; i < themedItems.items.length; i++) {                  //adds three random, unique distractors to each test item
      includedItems.push(i);
      for (var j = 1; j < 4; j++) {
        createUniqueDistractor(i);
        themedItems.items[i]["distractor" + j] = themedItems.items[distractorNum].item_answer_en;
      }//end 'for loop j'
      includedItems = [];                                               //empties includedItems for next loop to use
      themedItems.items[i].qOptions = [];
      themedItems.items[i].qOptions.push(themedItems.items[i].distractor1);
      themedItems.items[i].qOptions.push(themedItems.items[i].item_answer_en);
      themedItems.items[i].qOptions.push(themedItems.items[i].distractor2);
      themedItems.items[i].qOptions.push(themedItems.items[i].distractor3);
      themedItems.items[i].qOptions.sort(randomizeArray());
    }//end 'for loop i'
    console.log("and here are all the test items, with distractors: ", themedItems.items);


    testItem.current = themedItems.items[iterator];                        //send first test item to question view; prepare for second question
    iterator++;
  }// end beginTest

  function createUniqueDistractor() {
    distractorNum = Math.floor(Math.random() * (themedItems.items.length)); //create a new random distractor index
    if (includedItems.indexOf(distractorNum) !== -1) {                      //check if that index is already present in the array of test items
      createUniqueDistractor(distractorNum);                                //if so, create a new random distractor index
    } else {
      includedItems.push(distractorNum);                                    //if not, add it to the array of test items
    }
  }


  function randomizeArray(a, b){                                     //randomizes array of test items
    return 0.5 - Math.random();
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
