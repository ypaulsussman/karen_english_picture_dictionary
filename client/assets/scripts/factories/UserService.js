myApp.factory('UserService', ['$http', '$location', function($http, $location) {
var user = {};

function validateAdminRole() {
  $http.get('/user').then(function(response) {
      if(response.data.username && response.data.role==="student") {
      // user has a current session on the server and has a role of "student"? return to student page.
          $location.path("/student");
      } else if (response.data.username && response.data.role==="admin") {
      // user has a current session on the server and has a role of "admin"? they can stay.
        user.name = response.data.username;
        $location.path("/admin");
      } else {
      // user has no session? back to the login.
          $location.path("/home");
      }
  });//end session validation
}//end validateAdminRole

function validateStudentRole() {
  $http.get('/user').then(function(response) {
      // user has a current session on the server? They can stay.
      if(response.data.username) {
          user.name = response.data.username;
          //@TODO: a little hacky, but: the lines below route a student-user to the "student" lander on login,
          // and otherwise allow them to stay on current page... right? Explore further: this smells.
          if ($location.url()==="/student") {
            $location.path("/student");
          }
      } else {
      // user has no session? back to the login.
      console.log("here's what the failed student validation returns: ", response.data);
          $location.path("/home");
      }
  });//end session validation
}//end validateStudentRole

function logout() {
  $http.get('/user/logout').then(function(response) {
    console.log('logged out');
    $location.path("/home");
  });
}//end logout




return{
  validateAdminRole: validateAdminRole,
  validateStudentRole: validateStudentRole,
  user: user,
  logout: logout,
};

}]);//end ItemService
