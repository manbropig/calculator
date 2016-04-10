app.directive('webCalc', ['Calculator', 'Symbols', function(Calculator, Symbols) {
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
      var calculator = new Calculator();
      scope.monitorValue = 0;

      scope.numKeys = Symbols.numbers;
      scope.modKeys = Symbols.modifiers;
      scope.opsKeys = Symbols.operations;
      scope.numKeys.push(Symbols.decimal); //to render properly in ng-repeat

      scope.$on('clicked', function(event, key) {
        console.log(key);
        //make this accept 0
        var result = calculator.process(key);
        scope.monitorValue = (result === '') ? scope.monitorValue : result;
      });
    }
  }
}]);
