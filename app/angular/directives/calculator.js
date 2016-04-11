app.directive('webCalc', ['Calculator', 'Symbols', function(Calculator, Symbols) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/templates/directives/calculator.html',
    scope: {},
    link: function(scope, elem, attrs) {
      var calculator = new Calculator();
      var defaultFontSize = 42;
      scope.monitorStyle = { 'font-size': defaultFontSize + 'px' };
      scope.monitorValue = 0;

      scope.numKeys = Symbols.numbers;
      scope.modKeys = Symbols.modifiers;
      scope.opsKeys = Symbols.operations;
      scope.numKeys.push(Symbols.decimal); //to render properly in ng-repeat

      scope.$on('clicked', function(event, key) {
        var result = calculator.process(key);
        scope.monitorValue = (result === '') ? scope.monitorValue : result;
        scope.monitorValue = scope.monitorValue.toString();
        scope.$broadcast('key.change', calculator.allClearFlag ? 'AC' : 'C');

      });

      //decrease font size for large numbers
      scope.$watch('monitorValue.length', function(newValue) {
        //TODO: this can be better
        var fontSize = defaultFontSize;
        if (newValue > 9 && newValue < 14) {
          fontSize = defaultFontSize - ((newValue - 9) * 3);
        } else if (newValue >= 14) {
          fontSize = 28 - ((newValue - 14) * 3);
        }
        scope.monitorStyle = { 'font-size': fontSize + 'px' };
      });
    }
  }
}]);
