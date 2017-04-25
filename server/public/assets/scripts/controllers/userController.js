myApp.controller('UserController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  // This happens after view/controller loads -- not ideal but it works for now.
  console.log('checking user');
  $http.get('/user').then(function(response) {
      if(response.data.username && response.data.role==="student") {
          // user has a current session on the server and is student
          $scope.userName = response.data.username;
          console.log('User Data: ', response.data.username, response.data.role, " yep a student");
          $location.path("/student");
      } else if (response.data.username && response.data.role==="admin") {
        // user has a current session on the server and is admin
        $scope.userName = response.data.username;
        $scope.role = response.data.role;
        console.log('User Data: ', $scope.userName, $scope.role, "  totally admin");
        $location.path("/admin");
      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }
  });

  $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };
}]);
