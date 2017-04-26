myApp.factory('TestService', ['$http', '$location', function($http, $location) {
  var themedItems = null;
  var iterator = 0;



  return {
    themedItems: themedItems,
    iterator: iterator,
  };

}]); //end ItemService
