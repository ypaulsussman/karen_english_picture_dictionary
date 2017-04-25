myApp.controller('StudentController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  // This happens after view/controller loads -- not ideal but it works for now.
  console.log('checking user');

  $http.get('/user').then(function(response) {
      // user has a current session on the server? They can stay.
      if(response.data.username) {
          $scope.userName = response.data.username;
          $location.path("/student");
      } else {
      // user has no session? back to the login.
          $location.path("/home");
      }
  });//end session validation

  $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };//end logout
}]);
