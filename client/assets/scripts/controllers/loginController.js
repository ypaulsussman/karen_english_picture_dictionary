myApp.controller('LoginController', ['$scope', '$http', '$location', '$mdDialog', 'UserService', function($scope, $http, $location, $mdDialog, UserService) {
  $scope.go = UserService.go;
  $scope.loginAlert = UserService.loginAlert;


  $scope.user = {
      username: '',
      password: ''
    };
  $scope.message = '';


    $scope.login = function() {
      if($scope.user.username === '' || $scope.user.password === '') {
        $scope.loginAlert('incomplete');
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/', $scope.user).then(function(response) {
          if(response.data.username && response.data.role==="student") {
            console.log('success: your profile is...', response.data);
            console.log('redirecting to student page');
            $location.path('/student');
          } else if (response.data.username && response.data.role==="admin") {
            console.log('success: your profile is...', response.data);
            console.log('redirecting to admin page');
            $location.path('/admin');
          } else {
            console.log('failure: ', response);
            $scope.loginAlert('wrongPassword');
          }
        });
      }
    };

    $scope.registerUser = function() {
      if($scope.user.username === '' || $scope.user.password === '') {
        $scope.loginAlert('incomplete');
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/register', $scope.user).then(function(response) {
          console.log('success');
          $scope.loginAlert('userCreated');
          $location.path('/home');
        },
        function(response) {
          console.log('error');
          $scope.UserCreationErrorAlert();
        });
      }
    };
}]);
