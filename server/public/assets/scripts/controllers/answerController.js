myApp.controller('AnswerController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateStudentRole();
  $scope.userName = UserService.user;

  $scope.testItem = ItemService.testItem;
  $scope.nextTestItem = ItemService.nextTestItem;

  $scope.answerMeta = ItemService.answerMeta;







$scope.backToThemes = ItemService.backToThemes;


//@TODO: abstract the WebSpeech call to a factory
//@TODO: alter rate of speech to be slower
  var text = $scope.testItem.current.item_answer_en;
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
