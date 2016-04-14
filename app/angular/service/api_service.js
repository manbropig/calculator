app.service('APIService', ['$http', function($http) {
  return {
    //function to call api to send calculation and results
    sendCalculation: function(calculation, result) {
      var data = { result: result, calculation: calculation };

      $http.post('http://localhost:3000/results', data)
        .then(function(results) {
          console.log(results);
        });
    }
  }
}]);
