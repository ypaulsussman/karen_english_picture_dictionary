myApp.factory('ItemService', ['$http', function($http) {
var allItems = {};

function getAllItems() {
  $http.get('/items').then(function(response) {
    console.log(response.data);
    allItems.items = response.data;
    console.log('allItems is: ', allItems);
    });
}//end getAllItems



return{
  getAllItems: getAllItems,
  allItems: allItems,
};//end return

}]);//end ItemService
