myApp.controller('AnswerController', ['$scope', '$http', '$location', 'ItemService', 'UserService', function($scope, $http, $location, ItemService, UserService) {
  UserService.validateStudentRole();
  $scope.userName = UserService.user;
  $scope.testWebSpeech = ItemService.testWebSpeech;

  $scope.testItem = ItemService.testItem;
  $scope.nextTestItem = ItemService.nextTestItem;
  $scope.answerMeta = ItemService.answerMeta;

  $scope.studying = ItemService.studying;
  $scope.addStudyItem = ItemService.addStudyItem;
  $scope.backToThemes = ItemService.backToThemes;


//@TODO: abstract the WebSpeech call to a factory
  var text = $scope.testItem.current.item_answer_en;
  var synth = window.speechSynthesis;
  var speechRate = 0.5;
  var voices = synth.getVoices();
  // if (speechSynthesis.onvoiceschanged !== undefined) {
  //   speechSynthesis.onvoiceschanged = populateVoiceList;
  // }
  //
  // function populateVoiceList() {
  //   voices = synth.getVoices();
  // }
  //
  $scope.readEntry = function() {
    var utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = voices[45];
    utterThis.rate = speechRate;
    synth.speak(utterThis);
  };

}]);
