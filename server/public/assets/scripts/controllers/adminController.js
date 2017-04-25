myApp.controller('AdminController', ['$scope', '$http', '$location', function($scope, $http, $location) {
  console.log('checking user');

  $http.get('/user').then(function(response) {
      if(response.data.username && response.data.role==="student") {
      // user has a current session on the server and has a role of "student"? return to student page.
          $location.path("/student");
      } else if (response.data.username && response.data.role==="admin") {
      // user has a current session on the server and has a role of "admin"? they can stay.
        $scope.userName = response.data.username;
        $location.path("/admin");
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

  $scope.themes = ('The Classroom; Months & Weather; My Apartment; Numbers; Transportation').split('; ').map(function (theme) { return { name: theme }; });
    var item = {};

    $scope.itemTheme = '';
    $scope.itemURL = '';
    $scope.itemEN = '';
    $scope.itemKN = '';
    $scope.itemPron = '';

    $scope.logItem = function() {
      item.itemTheme = $scope.itemTheme;
      item.itemURL = $scope.itemURL;
      item.itemEN = $scope.itemEN;
      item.itemKN = $scope.itemKN;
      item.itemPron = $scope.itemPron;
      console.log(item);
      console.log('suuup');
    };//end logItem

    $scope.query = {
      order: 'name',
      limit: 50,
      page: 1
    };

  $scope.getTypes = function () {
    return ['Candy', 'Ice cream', 'Other', 'Pastry'];
  };

  $scope.desserts = { "count": 9, "data": [ { "name": "Frozen yogurt", "type":
  "Ice cream", "calories": { "value": 159.0 }, "fat": { "value": 6.0 }, "carbs": {
  "value": 24.0 }, "protein": { "value": 4.0 }, "sodium": { "value": 87.0 },
  "calcium": { "value": 14.0 }, "iron": { "value": 1.0 } }, { "name": "Ice cream sandwich", "type": "Ice cream", "calories": { "value": 237.0 }, "fat": {
  "value": 9.0 }, "carbs": { "value": 37.0 }, "protein": { "value": 4.3 },
  "sodium": { "value": 129.0 }, "calcium": { "value": 8.0 }, "iron": { "value":
  1.0 } }, { "name": "Eclair", "type": "Pastry", "calories": { "value":  262.0 },
  "fat": { "value": 16.0 }, "carbs": { "value": 24.0 }, "protein": { "value":  6.0 },
  "sodium": { "value": 337.0 }, "calcium": { "value":  6.0 }, "iron": { "value":
  7.0 } }, { "name": "Cupcake", "type": "Pastry", "calories": { "value":  305.0 },
  "fat": { "value": 3.7 }, "carbs": { "value": 67.0 }, "protein": { "value": 4.3 },
  "sodium": { "value": 413.0 }, "calcium": { "value": 3.0 }, "iron": { "value":
  8.0 } }, { "name": "Jelly bean", "type": "Candy", "calories": { "value":  375.0 },
  "fat": { "value": 0.0 }, "carbs": { "value": 94.0 }, "protein": { "value": 0.0 },
  "sodium": { "value": 50.0 }, "calcium": { "value": 0.0 }, "iron": { "value": 0.0 } }, {
  "name": "Lollipop", "type": "Candy", "calories": { "value": 392.0 }, "fat": {
  "value": 0.2 }, "carbs": { "value": 98.0 }, "protein": { "value": 0.0 },
  "sodium": { "value": 38.0 }, "calcium": { "value": 0.0 }, "iron": { "value": 2.0 } }, {
  "name": "Honeycomb", "type": "Other", "calories": { "value": 408.0 }, "fat": {
  "value": 3.2 }, "carbs": { "value": 87.0 }, "protein": { "value": 6.5 },
  "sodium": { "value": 562.0 }, "calcium": { "value": 0.0 }, "iron": { "value":
  45.0 } }, { "name": "Donut", "type": "Pastry", "calories": { "value": 452.0 },
  "fat": { "value": 25.0 }, "carbs": { "value": 51.0 }, "protein": { "value": 4.9 },
  "sodium": { "value": 326.0 }, "calcium": { "value": 2.0 }, "iron": { "value":
  22.0 } }, { "name": "KitKat", "type": "Candy", "calories": { "value": 518.0 },
  "fat": { "value": 26.0 }, "carbs": { "value": 65.0 }, "protein": { "value": 7.0 },
  "sodium": { "value": 54.0 }, "calcium": { "value": 12.0 }, "iron": { "value":
  6.0 } } ] };//end scope.desserts




}]);
