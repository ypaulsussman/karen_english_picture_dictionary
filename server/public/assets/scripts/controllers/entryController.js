myApp.controller('EntryController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateStudentRole();
  $scope.userName = UserService.user;

  $scope.entryItem = ItemService.entryItem;
  $scope.routeToTheme = ItemService.routeToTheme;

  $scope.backToItems = function() {
    var theme = {};
    theme.name = $scope.entryItem.item.item_theme;
    $scope.routeToTheme(theme);
  };

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
