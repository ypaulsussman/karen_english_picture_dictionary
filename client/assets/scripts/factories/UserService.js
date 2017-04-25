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

return{
  validateAdminRole: validateAdminRole,
  user: user,
};

}]);//end ItemService
