myApp.factory('UserService', ['$http', '$location', function($http, $location) {
  var user = {};

  function validateAdminRole() {
    $http.get('/user').then(function(response) {
      if (response.data.username && response.data.role === "student") {
        $location.path("/student"); // user has a current session on the server and has a role of "student"? return to student page.
      } else if (response.data.username && response.data.role === "admin") {
        user.name = response.data.username; // user has a current session on the server and has a role of "admin"? they can stay.
        $location.path("/admin");
      } else {
        $location.path("/home"); // user has no session? back to the login.
      }
    });
  }

  function validateStudentRole() {
    $http.get('/user').then(function(response) {
      if (response.data.username) { // user has a current session on the server? They can stay.
        user.name = response.data.username;
        //@TODO: a little hacky, but: the lines below route a student-user to the "student" lander on login,
        // and otherwise allow them to stay on current page... right? Explore further: this smells.
        if ($location.url() === "/student") {
          $location.path("/student");
        }
      } else {
        $location.path("/home"); // user has no session? back to the login.
      }
    });
  }

  function logout() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  }

  function go(path) {
    console.log('triggering for ', path);
    $location.path(path);
  }

  return {
    validateAdminRole: validateAdminRole,
    validateStudentRole: validateStudentRole,
    user: user,
    logout: logout,
    go: go
  };

}]); //end ItemService
