myApp.factory('UserService', ['$http', '$location', '$mdDialog', function($http, $location, $mdDialog) {
  var user = {};

  function go(path) {
    $location.path(path);
    user.username = '';
    user.password = '';
  }

  function loginAlert(prompt) {
    var title = '';
    var textContent = '';
    switch (prompt) {
      case 'incomplete':
        title = 'Incomplete!';
        textContent = 'Please write your Username and your Password.';
        break;
      case 'wrongPassword':
        title = 'Wrong ID!';
        textContent = 'Please check your name and password, and try again.';
        break;
      case 'userCreated':
        title = 'User successfully created!';
        textContent = 'Please log in to use the dictionary.';
        break;
      default:
        title = 'Uh-Oh!';
        textContent = 'Something went wrong. Please try again!';
    }
     $mdDialog.show(
       $mdDialog.alert()
         .clickOutsideToClose(true)
         .title(title)
         .textContent(textContent)
         .ariaLabel('Alert Dialog')
         .ok('OK!')
     );
   }

   function login() {
     if(user.username === '' || user.password === '') {
       loginAlert('incomplete');
     } else {
       $http.post('/', user).then(function(response) {
         if(response.data.username && response.data.role==="student") {
           $location.path('/student');
         } else if (response.data.username && response.data.role==="admin") {
           $location.path('/admin');
         } else {
           loginAlert('wrongPassword');
         }
       });
     }
   }

   function registerUser() {
     if(user.username === '' || user.password === '') {
       loginAlert('incomplete');
     } else {
       $http.post('/register', user).then(function(response) {
         loginAlert('userCreated');
         go('/home');
       },
       function(response) {
         console.log('error: ', response);
         UserCreationErrorAlert();
       });
     }
   }

   function validateAdminRole() {
     $http.get('/user').then(function(response) {
       if (response.data.username && response.data.role === "student") {
         $location.path("/student"); // user has a current session on the server and has a role of "student"? return to student page.
       } else if (response.data.username && response.data.role === "admin") {
         user.name = response.data.username; // user has a current session on the server and has a role of "admin"? they can stay.
         user.id = response.data.id;
         console.log("inside UserService adminVal, we've got: ", user.id);
         $location.path("/admin");
       } else {
         $location.path("/home"); // user has no session? back to the login.
       }
     });
   }

   function validateStudentRole() {
     $http.get('/user').then(function(response) {
       if (response.data.username) { // user has a current session on the server, regardless of role? They can stay.
         user.name = response.data.username;
         user.id = response.data.id;
         console.log("inside UserService studentVal, we've got: ", user.id);
         } else {
         $location.path("/home"); // user has no session? back to the login.
       }
     });
   }

   function logout() {
     $http.get('/user/logout').then(function(response) {
       go("/home");
     });
   }

  return {
    validateAdminRole: validateAdminRole,
    validateStudentRole: validateStudentRole,
    user: user,
    logout: logout,
    go: go,
    loginAlert: loginAlert,
    login: login,
    registerUser: registerUser,
  };

}]); //end ItemService
