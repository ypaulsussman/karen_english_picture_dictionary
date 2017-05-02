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
  var searching = {now: false};

  /**
   * This function routes through items.js to retrieve all dictionary entries;
   *  it's used for the Admin view, and in the search mode of Student view.
   */
  function getAllItems() {
    $http.get('/items').then(function(response) {
      allItems.items = response.data;
    });
  }

  /**
   * This function routes through items.js to add a new dictionary entry.
   * @param {object} item - The entry to be added (specified in AdminController.)
   */
  function addItem(item) {
    var copy = angular.copy[item];
    $http.post('/items/add', item).then(function(response) {
      getAllItems();
    });
  }

  /**
   * This function routes through items.js to update a preexisting dictionary entry.
   * @param {object} item - The entry to be altered (specified in AdminController.)
   */
  function updateItem(item) {
    var copy = angular.copy[item];
    $http.put('/items/update', item).then(function(response) {
      getAllItems();
    });
  }

  /**
   * This function routes through items.js to remove a dictionary entry, per its ID.
   * @param {object} item - The entry to be removed (specified in AdminController.)
   */
  function deleteItem(item) {
    var removeID = item.id;
    $http.delete('/items/delete/' + removeID).then(function() {
      getAllItems();
    });
  }

  /**
   * This is an array of objects representing the Karen and English words for
   * each theme displayed in the Student view.
   * @TODO: if time allows, put this in its own table.
   */
  var themes = [{name: 'The Classroom', nameKN: 'wDR \'X;' }, { name: 'Months and Weather',
      nameKN: 'rlcd. uvHR oD. *DR' }, { name: 'At Home', nameKN: '[H. \'X; zSd.' },
      {name: 'Numbers', nameKN: 'eD. *H>' }, { name: 'Travelling', nameKN: 'w> vJR w> uhR' }, ];

  /**
   * This function takes the user to the search mode, either from the
   * student view landing page, or from an individual entry.
   */
  function routeToSearch(){
    searching.now = true;
    $location.path("/search");
    getAllItems();
  }

  /**
   * This function routes the user to the view for either all the entries in a specific theme,
   * or for the first item in a test of those entries.
   * @param {object} theme - The theme selected by the user to be opened.
   * @param {boolean} takingTest - Whether the user clicked the "test" button, or the "theme" button.
   */
  function routeToTheme(theme, takingTest) {
    if (takingTest) {
      $location.path("/question");
    } else {
      $location.path("/theme");
    }
    getThemedItems(theme, takingTest);
  }

  /**
   * This function routes through items.js to retrieve all dictionary entries
   * of a specific theme, and begins a test of those entries (if so directed.)
   * @param {object} theme - The theme selected by the user to be opened.
   * @param {boolean} takingTest - Whether the user clicked the "test" button, or the "theme" button.
   */
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

  /**
   * This function routes the user to the view that holds an individual dictionary entry,
   * then specifies which entry to display.
   * @param {object} item - The item selected by the user to be opened.
   */
  function openEntry(item) {
    $location.path("/entry");
    entryItem.item = item;
  }

  /**
   * This function cancels any ongoing search-sessions or testing-session, then
   * routes the user to the 'list of themes' student view.
   */
  function backToThemes() {
    searching.now = false;
    answerMeta.correctAnswerSum = 0;
    answerMeta.totalAnswers = 0;
    $location.path("/student");
  }

  function beginTest(themedItems) {
    themedItems.items.sort(randomizeArray);
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
      themedItems.items[i].qOptions.sort(randomizeArray);
    }//end 'for loop i'
    testItem.current = themedItems.items[iterator];                        //send first test item to question view; prepare for second question
    iterator++;
  }// end beginTest

  function randomizeArray(a, b){                             //randomizes arrays, somewhat
    return 0.5 - Math.random();
  }

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
    searching: searching,
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
