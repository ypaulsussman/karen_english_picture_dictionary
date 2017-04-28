myApp.factory('ItemService', ['$http', '$location', function($http, $location) {
  var allItems = {};
  var themedItems = {};
  var entryItem={};
  var iterator = 0;
  var testItem = {};
  var distractorNum = 0;
  var includedItems = [];
  var answerMeta = {
    correctness: true,
    correctAnswerSum: 0,
    totalAnswers: 0,
  };

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
    if (takingTest) {
      $location.path("/question");
    } else {
      $location.path("/theme");
    }
    getThemedItems(theme, takingTest);
  }

  function routeToSearch(){
    console.log('search function clicked!');
    $location.path("/search");
    getAllItems();
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

  function backToThemes() {
    answerMeta.correctAnswerSum = 0;
    answerMeta.totalAnswers = 0;
    $location.path("/student");
  }

  function beginTest(themedItems) {
    themedItems.items.sort(function(a, b){                             //randomizes arrays, somewhat
      return 0.5 - Math.random();
    });
    for (var i = 0; i < themedItems.items.length; i++) {                  //adds three random, unique distractors to each test item
      includedItems.push(i);
      for (var j = 1; j < 4; j++) {
        createUniqueDistractor(i);
        themedItems.items[i]["distractor" + j] = themedItems.items[distractorNum].item_answer_en;
      }//end 'for loop j'
      includedItems = [];                                               //empties includedItems for next loop to use
      themedItems.items[i].qOptions = [];                                 //creates array of answers to display
      themedItems.items[i].qOptions.push(themedItems.items[i].distractor1);
      themedItems.items[i].qOptions.push(themedItems.items[i].item_answer_en);
      themedItems.items[i].qOptions.push(themedItems.items[i].distractor2);
      themedItems.items[i].qOptions.push(themedItems.items[i].distractor3);
      themedItems.items[i].qOptions.sort(function(a, b){                             //randomizes arrays, somewhat
        return 0.5 - Math.random();
      });
    }//end 'for loop i'
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

  function getAnswer(qOption) {
    if (qOption === themedItems.items[(iterator-1)].item_answer_en){
      answerMeta.correctness = true;
      answerMeta.correctAnswerSum++;
      $location.path("/answer");
    } else {
      answerMeta.correctness = false;
      $location.path("/answer");
    }
  }

  function nextTestItem() {
    if (iterator >= themedItems.items.length) {
      $location.path("/completed");
      answerMeta.totalAnswers = iterator;
      iterator = 0;
    } else {
      $location.path("/question");
      testItem.current = themedItems.items[iterator];
      iterator++;
    }
  }





  return {
    getAllItems: getAllItems,
    allItems: allItems,
    addItem: addItem,
    updateItem: updateItem,
    deleteItem: deleteItem,
    themes: themes,
    routeToTheme: routeToTheme,
    routeToSearch: routeToSearch,
    themedItems: themedItems,
    openEntry: openEntry,
    entryItem: entryItem,
    backToThemes: backToThemes,
    testItem: testItem,
    getAnswer: getAnswer,
    nextTestItem: nextTestItem,
    answerMeta: answerMeta,
  }; //end return

}]); //end ItemService
