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
  var studying = {
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
   * @desc an array of objects representing the Karen and English words for
   * each theme displayed in the Student view.
   * @TODO: transfer these themes to their own db table.
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
   * @desc takes the user to the search mode, either from the
   * student view landing page, or from an individual entry.
   */
  function routeToSearch() {
    searching.now = true;
    $location.path("/search");
    getAllItems();
  }

  /**
   * @param {object} theme - The theme selected by the user to be opened.
   * @param {boolean} takingTest - Whether the user clicked the "test" button, or the "theme" button.
   * @desc routes the user to the view for either all the entries in a specific theme,
   * or for the first item in a test of those entries.
   */
  function routeToTheme(theme, takingTest, user) {
    console.log("here's your theme at routeToTheme: ", theme);
    if (takingTest) {
      $location.path("/question");
    } else {
      $location.path("/theme");
    }
    getThemedItems(theme, takingTest, user);
  }

  /**
   * @param {object} theme - The theme selected by the user to be opened.
   * @param {boolean} takingTest - Whether the user clicked the "test" button, or the "theme" button.
   * @desc routes through items.js to retrieve all dictionary entries
   * of a specific theme, and begins a test of those entries (if so directed.)
   */
  function getThemedItems(theme, takingTest, user) {
    if (user) {
      studying.now = true;
      console.log("set study to true");
    }
    console.log("here's your theme name at getThemedItems: ", theme.name);
    var themeID = theme.name;
    var userID = user;
    console.log("here's the ID we get at ItemService: ", user);
    $http.get('/items/themed/' + themeID + '/' + userID).then(function(response) {
      console.log("here's what you get back from db: ", response.data);
      themedItems.items = response.data;
    }).then(function() {
      if (takingTest) {
        beginTest(themedItems);
      }
    });
  }

  /**
   * @param {object} item - The item selected by the user to be opened.
   * @desc routes the user to the view that holds an individual dictionary entry,
   * then specifies which entry to display.
   */
  function openEntry(item) {
    $location.path("/entry");
    entryItem.item = item;
  }

  /**
   * @desc cancels any ongoing search-sessions or testing-session, then
   * routes the user to the Student view.
   */
  function backToThemes() {
    studying.now = false;
    console.log("set study to false");
    searching.now = false;
    answerMeta.correctAnswerSum = 0;
    answerMeta.totalAnswers = 0;
    $location.path("/student");
  }

  /**
   * @param {object} themedItems - An object holding an array of one theme's dictionary entries,
   * as retrieved by the getThemedItems() function.
   * @desc creates a randomized array of test items, each with randomized
   * distractors, then sends the displays the test item to the user.
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
   * @param {object} a - The first element being "compared" in a given .sort() method
   * @param {object} b - The second element being "compared" in a given .sort() method
   * @returns {number} - A float between .5 and -.5, whose sign determines
   * whether parameter b is moved brefore parameter a.
   * @desc randomizes arrays of e.g. the test items and distractors
   * used in the beginTest() function.
   */
  function randomizeArray(a, b) {
    return 0.5 - Math.random();
  }

  /**
   * @desc selects a random, unique number to serve as the
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
   * @param {string} qOption - The test answer selected by the user.
   * @desc determines whether the user chose the correct test item,
   * updates the overall test score, then routes them to the correct answer.
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
   * @desc determines whether the test is complete, then either resets
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

  function addStudyItem(itemID, userID) {
    console.log('foo', itemID, "bar", userID);
    var studyItem = {
      itemID: itemID,
      userID: userID,
    };
    console.log("here's the object to pass: ", studyItem);
    $http.post('/items/add_study', studyItem).then(function(response) {
      console.log("success!  ", response);
    });
  }

function removeStudyItem(itemID, userID) {
  $http.delete('/items/delete_study/' + itemID).then(function() {
    routeToTheme({name: 'list'}, false, userID);
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
    searching: searching,
    studying: studying,
    routeToSearch: routeToSearch,
    themedItems: themedItems,
    openEntry: openEntry,
    entryItem: entryItem,
    backToThemes: backToThemes,
    testItem: testItem,
    getAnswer: getAnswer,
    nextTestItem: nextTestItem,
    answerMeta: answerMeta,
    addStudyItem: addStudyItem,
    removeStudyItem: removeStudyItem,
  }; //end return

}]); //end ItemService
