myApp.controller('EntryController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateStudentRole();
  $scope.userName = UserService.user;

  $scope.entryItem = ItemService.entryItem;

  $scope.routeToTheme = ItemService.routeToTheme;
  $scope.searching = ItemService.searching;
  $scope.routeToSearch = ItemService.routeToSearch;

  $scope.studying = ItemService.studying;
  $scope.addStudyItem = ItemService.addStudyItem;
  $scope.removeStudyItem = ItemService.removeStudyItem;

  $scope.exitEntry = function() {
      if ($scope.searching.now) {
        $scope.routeToSearch();
      } else if ($scope.studying.now) {
        $scope.routeToTheme({name: 'list'}, false, $scope.userName.id);
      } else {
        $scope.routeToTheme({name: $scope.entryItem.item.item_theme});
      }
  };



//@TODO: abstract the WebSpeech call to a factory
  var text = $scope.entryItem.item.item_answer_en;
  var synth = window.speechSynthesis;
  var speechRate = 0.6;

  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  function populateVoiceList() {
    voices = synth.getVoices();
  }

  $scope.readEntry = function() {
    var utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = voices[45];
    utterThis.rate = speechRate;
    synth.speak(utterThis);
  };

}]);
