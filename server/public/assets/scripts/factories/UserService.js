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
          $location.path("/student");
      } else {
      // user has no session? back to the login.
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
