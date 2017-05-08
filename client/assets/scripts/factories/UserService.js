myApp.factory('UserService', ['$http', '$location', '$mdDialog', function($http, $location, $mdDialog) {
  var user = {
    id: null,
  };

  /**
   * @desc routes a user between the register/home views
   * @param {string} path - The route (per clientapp.js) to which this function
   * takes the user
   */
  function go(path) {
    $location.path(path);
    user.username = '';
    user.password = '';
  }

  /**
   * @desc displays an AngularJS Material dialog informing user of their
   * success/failure at logging in or registering
   * @param {string} prompt - The reason for the dialog's creation.
   */
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
      case 'preexisting user':
        title = 'Username already taken!';
        textContent = 'Please register with a different username.';
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

  /**
   * @desc checks whether both input fields are complete, then authenticates
   * that information via Passport.
   */
  function login() {
    if (user.username === '' || user.password === '') {
      loginAlert('incomplete');
    } else {
      $http.post('/', user).then(function(response) {
        if (response.data.username && response.data.role === "student") {
          $location.path('/student');
        } else if (response.data.username && response.data.role === "admin") {
          $location.path('/admin');
        } else {
          loginAlert('wrongPassword');
        }
      });
    }
  }

  /**
   * @desc checks whether both input fields are complete, then creates a new
   * user via Passport.
   */
  function registerUser() {
    if (user.username === '' || user.password === '') {
      loginAlert('incomplete');
    } else {
      $http.post('/register', user).then(function(response) {
          loginAlert('userCreated');
          go('/home');
        },
        function(response) {
          loginAlert('preexisting user');
        });
    }
  }

  /**
   * @desc ensures that only users with the "admin" role may access the admin view.
   */
  function validateAdminRole() {
    $http.get('/user').then(function(response) {
      // user has a current session on the server and has a role of "student"? return to student page.
      if (response.data.username && response.data.role === "student") {
        $location.path("/student");
      // user has a current session on the server and has a role of "admin"? they can stay.
      } else if (response.data.username && response.data.role === "admin") {
        user.name = response.data.username;
        user.id = response.data.id;
        $location.path("/admin");
     // user has no session? back to the login.
      } else {
        $location.path("/home");
      }
    });
  }

  /**
   * @desc ensures that only logged-in users (of any role) may access the
   * student view.
   */
  function validateStudentRole() {
    $http.get('/user').then(function(response) {
      //user has a current session on the server, regardless of role? They can stay.
      if (response.data.username) {
        user.name = response.data.username;
        user.id = response.data.id;
      //user has no session? back to the login.
      } else {
        $location.path("/home");
      }
    });
  }

  /**
   * @desc logs the user out of the app, and returns to the login page.
   */
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
