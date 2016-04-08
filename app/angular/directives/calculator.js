app.directive('webCalc', [function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/templates/directives/calculator.html',
    scope: {},
    link: function(scope, elem, attrs) {
      /*  things to remember:
        * smaller font size as numbers get large
        * doing long operations - heavier logic
        * AC/C button
        * = button repeats last op
      */
      var currentCalc = 0;
      scope.monitorValue = 0;
      scope.buttonClicked = function(key) {

        scope.monitorValue += key.display;
        console.log(key.display);
      }

      //decided to have different directives for numbers and operations
      scope.numbers = '7894561230.'.split('');
      scope.numKeys = scope.numbers.map(initKey);

      scope.topKeys = ['AC', '+/-', '%'];
      scope.topKeys = scope.topKeys.map(initKey);

      scope.opsKeys = '/x-+='.split('');
      scope.opsKeys = scope.opsKeys.map(initKey);
      function initKey(key) {
        return {display: key}
      }
    }
  }
}]);
