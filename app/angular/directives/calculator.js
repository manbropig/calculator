app.directive('webCalc', ['Calculator', 'Symbols', 'APIService', function(Calculator, Symbols, APIService) {
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
        inputKey(key);
      });

      scope.prepareKey = function($event) {
        //determine key that was pressed
        //1-0,-+=*x/ (backspace)
        var keyCode = $event.keyCode;
        var shift = $event.shiftKey;
        var key;
        for (var i = 48; i <= 57; i++) {
          if (keyCode === i) {
            key = {value: i - 48, keyType: 'number'};
          }
        }//numbers 0 - 9

        if (!key) {
          key = {
            107: shift ? {value: '+'} : undefined,
            109: {value: '-'},
            189: {value: '-'},
            110: {value: '.'},
            111: {value: '/'},
            106: {value: 'x'}, //mult
            88:  {value: 'x'},
            13:  {value: '='},
            187: shift ? {value: '+'} : {value: '='},
          }[keyCode];
          if (key) {
            key.keyType = key.value === '.' ? 'decimal' : 'operation';
          }
        }

        console.log(key);
        return key;
      }

      scope.sendKey = function($event) {
        var key = scope.prepareKey($event);
        if (key) {
          inputKey(key);
        }
      }

      scope.restyle = function($event) {
        var key = scope.prepareKey($event);
        if (key) {
          scope.$broadcast('key.pressed', key);
        }
      }

      function inputKey(key) {
        var result = calculator.process(key);
        scope.monitorValue = (result === '') ? scope.monitorValue : result;
        scope.monitorValue = scope.monitorValue.toString();
        scope.$broadcast('key.change', calculator.allClearFlag ? 'AC' : 'C');
        // if (key.value === '=') {
        //   APIService.sendCalculation(calculator.currCalc, calculator.currNum);
        // }

        scope.$broadcast('key.release', key);
      }

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
