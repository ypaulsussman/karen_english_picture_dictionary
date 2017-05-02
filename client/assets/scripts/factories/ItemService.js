myApp.factory('ItemService', ['$http', '$location', function($http, $location) {
  var allItems = {};
  var themedItems = {};
  var entryItem = {};
  var iterator = 0;
  var testItem = {};
  var distractorNum = 0;
  var includedItems = [];
  var answerMeta = {
    correctness: true,
    correctAnswerSum: 0,
    totalAnswers: 0,
  };
  var searching = {
    now: false
  };

  /**
   * @desc routes through items.js to retrieve all dictionary entries;
   * it's used for the Admin view, and in the search mode of Student view.
   */
  function getAllItems() {
    $http.get('/items').then(function(response) {
      allItems.items = response.data;
    });
  }

  /**
   * @param {object} item - The entry to be added (specified in AdminController.)
   * @desc routes through items.js to add a new dictionary entry.
   */
  function addItem(item) {
    var copy = angular.copy[item];
    $http.post('/items/add', item).then(function(response) {
      getAllItems();
    });
  }

  /**
   * @param {object} item - The entry to be altered (specified in AdminController.)
   * @desc routes through items.js to update a preexisting dictionary entry.
   */
  function updateItem(item) {
    var copy = angular.copy[item];
    $http.put('/items/update', item).then(function(response) {
      getAllItems();
    });
  }

  /**
   * @param {object} item - The entry to be removed (specified in AdminController.)
   * @desc routes through items.js to remove a dictionary entry, per its ID.
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
  var themes = [{
      name: 'The Classroom',
      nameKN: 'wDR \'X;'
    }, {
      name: 'Months and Weather',
      nameKN: 'rlcd. uvHR oD. *DR'
    }, {
      name: 'At Home',
      nameKN: '[H. \'X; zSd.'
    },
    {
      name: 'Numbers',
      nameKN: 'eD. *H>'
    }, {
      name: 'Travelling',
      nameKN: 'w> vJR w> uhR'
    },
  ];

  /**
   * This function takes the user to the search mode, either from the
   * student view landing page, or from an individual entry.
   */
  function routeToSearch() {
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
    $http.get('/items/themed/' + themeID).then(function(response) {
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
   * routes the user to the Student view.
   */
  function backToThemes() {
    searching.now = false;
    answerMeta.correctAnswerSum = 0;
    answerMeta.totalAnswers = 0;
    $location.path("/student");
  }

  /**
   * This function creates a randomized array of test items, each with randomized
   * distractors, then sends the displays the test item to the user.
   * @param {object} themedItems - An object holding an array of one theme's dictionary entries,
   * as retrieved by the getThemedItems() function.
   */
  function beginTest(themedItems) {
    themedItems.items.sort(randomizeArray);
    //these nested for-loops add three random, unique distractors to each test item
    for (var i = 0; i < themedItems.items.length; i++) {
      //this ensures that the correct answer isn't chosen as a randomized distractor
      includedItems.push(i);
      for (var j = 1; j < 4; j++) {
        createUniqueDistractor(i);
        //this creates a new distractor property:value pair inside the test item
        themedItems.items[i]["distractor" + j] = themedItems.items[distractorNum].item_answer_en;
      } //end 'for loop j'
      //empties includedItems for next loop to use
      includedItems = [];
      //creates array of answers to be displayed
      themedItems.items[i].qOptions = [];
      themedItems.items[i].qOptions.push(themedItems.items[i].distractor1);
      themedItems.items[i].qOptions.push(themedItems.items[i].item_answer_en);
      themedItems.items[i].qOptions.push(themedItems.items[i].distractor2);
      themedItems.items[i].qOptions.push(themedItems.items[i].distractor3);
      themedItems.items[i].qOptions.sort(randomizeArray);
    } //end 'for loop i'
    //sends first test item to question view
    testItem.current = themedItems.items[iterator];
    //prepare for second question
    iterator++;
  }

  /**
   * This function randomizes arrays of e.g. the test items and distractors
   * used in the beginTest() function.
   * @param {object} a - The first element being "compared" in a given .sort() method
   * @param {object} b - The second element being "compared" in a given .sort() method
   */
  function randomizeArray(a, b) {
    return 0.5 - Math.random();
  }

  /**
   * This function selects a random, unique number to serve as the
   * next array index for the distractors chosen in the beginTest() function.
   */
  function createUniqueDistractor() {
    //creates a new random distractor index
    distractorNum = Math.floor(Math.random() * (themedItems.items.length));
    //check if that index is already present in the array of test items
    if (includedItems.indexOf(distractorNum) !== -1) {
      //if so, create a new random distractor index
      createUniqueDistractor(distractorNum);
    } else {
      //if not, add it to the array of test items
      includedItems.push(distractorNum);
    }
  }

  /**
   * This function determines whether the user chose the correct test item,
   * updates the overall test score, then routes them to the correct answer.
   * @param {string} qOption - The test answer selected by the user.
   */
  function getAnswer(qOption) {
    if (qOption === themedItems.items[(iterator - 1)].item_answer_en) {
      answerMeta.correctness = true;
      answerMeta.correctAnswerSum++;
    } else {
      answerMeta.correctness = false;
    }
    $location.path("/answer");
  }

  /**
   * This function determines whether the test is complete, then either resets
   * the test (if it is finished), or moves to the next test item (if it is not.)
   */
  function nextTestItem() {
    if (iterator >= themedItems.items.length) {
      $location.path("/completed");
      answerMeta.totalAnswers = themedItems.items.length;
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
