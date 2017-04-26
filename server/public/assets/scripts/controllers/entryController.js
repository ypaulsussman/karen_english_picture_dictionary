myApp.controller('EntryController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateStudentRole();
  $scope.userName = UserService.user;

  $scope.entryItem = ItemService.entryItem;
  $scope.routeToTheme = ItemService.routeToTheme;

//@TODO: abstract the 'return to themed items list' function to a factory
  $scope.backToItems = function() {
    var theme = {};
    theme.name = $scope.entryItem.item.item_theme;
    $scope.routeToTheme(theme);
  };

//@TODO: abstract the WebSpeech call to a factory
//@TODO: alter rate of speech to be slower
  var text = $scope.entryItem.item.item_answer_en;
  var synth = window.speechSynthesis;

  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  function populateVoiceList() {
    voices = synth.getVoices();
  }

  $scope.readEntry = function() {
    var utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = voices[45];
    synth.speak(utterThis);
  };

}]);
