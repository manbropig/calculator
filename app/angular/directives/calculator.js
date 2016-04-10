app.directive('webCalc', ['Calculator', 'Symbols', function(Calculator, Symbols) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/templates/directives/calculator.html',
    scope: {},
    link: function(scope, elem, attrs) {
      /*  things to remember:
        * smaller font size as numbers get large
        * AC/C button
        * = button repeats last op √
      */
      var calculator = new Calculator();
      scope.monitorValue = 0;

      scope.numKeys = Symbols.numbers;
      scope.modKeys = Symbols.modifiers;
      scope.opsKeys = Symbols.operations;
      scope.numKeys.push(Symbols.decimal); //to render properly in ng-repeat

      scope.$on('clicked', function(event, key) {
        var result = calculator.process(key);
        scope.monitorValue = (result === '') ? scope.monitorValue : result;
      });
    }
  }
}]);
