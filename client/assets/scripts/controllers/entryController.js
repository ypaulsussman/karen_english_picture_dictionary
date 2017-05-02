myApp.controller('EntryController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateStudentRole();
  $scope.userName = UserService.user;

  $scope.entryItem = ItemService.entryItem;

  $scope.routeToTheme = ItemService.routeToTheme;
  $scope.searching = ItemService.searching;
  $scope.routeToSearch = ItemService.routeToSearch;


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
