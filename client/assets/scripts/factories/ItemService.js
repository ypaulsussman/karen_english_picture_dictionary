myApp.factory('ItemService', ['$http', '$location', '$mdDialog', function($http, $location, $mdDialog) {
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
  var minTestItems = 5;

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
   * @desc routes through items.js to add a new dictionary entry.
   * @param {object} item - The entry to be added (specified in AdminController.)
   */
  function addItem(item) {
    var copy = angular.copy[item];
    $http.post('/items/add', item).then(function(response) {
      getAllItems();
    });
  }

  /**
  * @desc routes through items.js to update a preexisting dictionary entry.
  * @param {object} item - The entry to be altered (specified in AdminController.)
  */
  function updateItem(item) {
    var copy = angular.copy[item];
    $http.put('/items/update', item).then(function(response) {
      getAllItems();
    });
  }

  /**
   * @desc routes through items.js to remove a dictionary entry, per its ID.
   * @param {object} item - The entry to be removed (specified in AdminController.)
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
   * @TODO: transfer these themes to their own db table;
   * hard-coding them here is unacceptably misleading for other users
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
   * @desc routes the user to the view for either all the entries in a specific theme,
   * @param {object} theme - The theme selected by the user to be opened.
   * @param {boolean} takingTest - Whether the user clicked the "test" button, or the "theme" button.
   * or for the first item in a test of those entries.
   */
  function routeToTheme(theme, takingTest, user) {
    if (takingTest) {
      $location.path("/question");
    } else {
      $location.path("/theme");
    }
    getThemedItems(theme, takingTest, user);
  }

  /**
   * @desc routes through items.js to retrieve all dictionary entries
   * of a specific theme, and begins a test of those entries (if so directed.)
   * @param {object} theme - The theme selected by the user to be opened.
   * @param {boolean} takingTest - Whether the user clicked the "test" button, or the "theme" button.
   */
  function getThemedItems(theme, takingTest, user) {
    if (user) {
      studying.now = true;
    }
    var themeID = theme.name;
    var userID = user;
    $http.get('/items/themed/' + themeID + '/' + userID).then(function(response) {
      themedItems.items = response.data;
    }).then(function() {
      if (takingTest && minTestItems > themedItems.items.length) {
        notEnoughItemsAlert();
        $location.path("/student");
      } else if (takingTest) {
        beginTest(themedItems);
      }
    });
  }

  /**
   * @desc displays an AngularJS Material dialog informing user that they can't
   * enter a test of their study list w/o first adding more dictionary entries
   */
  function notEnoughItemsAlert() {
    $mdDialog.show(
      $mdDialog.alert()
      .clickOutsideToClose(true)
      .title('Not enough test items!')
      .textContent('You need at least ' + minTestItems + ' items in your study list.')
      .ariaLabel('Alert Dialog')
      .ok('OK!')
    );
  }

  /**
   * @desc routes the user to the view that holds an individual dictionary entry,
   * then specifies which entry to display.
   * @param {object} item - The dictionary entry selected by the user to be opened.
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
    searching.now = false;
    answerMeta.correctAnswerSum = 0;
    answerMeta.totalAnswers = 0;
    $location.path("/student");
  }

  /**
   * @desc creates a randomized array of test items, each with randomized
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
   * @desc randomizes arrays of e.g. the test items and distractors
   * used in the beginTest() function.
   * @param {object} a - The first element being "compared" in a given .sort() method
   * @param {object} b - The second element being "compared" in a given .sort() method
   * @returns {number} - A float between .5 and -.5, whose sign determines
   * whether parameter b is moved before parameter a.
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
   * @desc determines whether the user chose the correct test item,
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

  /**
   * @desc associates a dictionary entry with a specific user, allowing that user
   * to call the entry from their study-list "theme"
   * @param {number} itemID - The primary-key ID of the item to be associated.
   * @param {number} userID - The primary-key ID of the user to be associated.
   */
  function addStudyItem(itemID, userID) {
    var studyItem = {
      itemID: itemID,
      userID: userID,
    };
    $http.post('/items/add_study', studyItem).then(function(response) {
      addStudyItemResult('success');
    }, function(reason) {
      addStudyItemResult('failure');
    });
  }

  /**
   * @desc displays an AngularJS Material dialog informing user of their
   * success/failure adding a dictionary entry to their study list.
   * @param {string} outcome - The result of the attempt to add the entry.
   */
  function addStudyItemResult(outcome) {
    var title = '';
    switch (outcome) {
      case 'success':
        title = 'You have saved this item!';
        break;
      case 'failure':
        title = 'You already saved this item.';
        break;
      default:
    }
    $mdDialog.show(
      $mdDialog.alert()
      .clickOutsideToClose(true)
      .title(title)
      .ariaLabel(title)
      .ok('OK!')
    );
  }

  /**
   * @desc deletes a user-item association, removing that item from the user's
   * study list, then returning the user to the study-list view.
   * @param {number} itemID - The primary-key ID of the item to be removed.
   * @param {number} userID - The primary-key ID of the user from whose study-list
   * the item will be removed.
   */
  function removeStudyItem(itemID, userID) {
    $http.delete('/items/delete_study/' + itemID).then(function() {
      routeToTheme({
        name: 'list'
      }, false, userID);
    });
  }

  /**
   * @desc tests whether a browser supports WebSpeech, thereby allowing views
   * to hide the 'read item' button study list, then returning the user to the study-list view.
   */
  function testWebSpeech() {
    if (('webkitSpeechRecognition' in window)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @desc uses speechSynthesis text-to-speech to play a computer recording
   * of a dictionary entry's English text
   * @param {string} text - The dictionary-entry to be played in audio
   */
  function readEntry(text) {
    var synth = window.speechSynthesis;
    var speechRate = 0.6;
    var voices = synth.getVoices();
    var utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = voices[45];
    utterThis.rate = speechRate;
    synth.speak(utterThis);
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
    testWebSpeech: testWebSpeech,
    readEntry: readEntry,
  }; //end return

}]); //end ItemService
