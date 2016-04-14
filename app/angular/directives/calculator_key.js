app.directive('calculatorKey', ['$sce', 'Symbols', function($sce, Symbols) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/templates/directives/calculator_key.html',
    scope: {
      key: '='
    },
    link: function(scope, elem, attrs) {
      //directive can be used for only display and allow the main controller to
      //just watch for any clicks to reduce the number of watchers.
      scope.isPressed = false;
      scope.isSelected = false; //only relevant for ops keys

      if (scope.key.keyType === 'modifier') {
        scope.display = {
          'AC': $sce.trustAsHtml('AC'),
          '%': $sce.trustAsHtml('%'),
          '+/-': $sce.trustAsHtml('&plusmn;')
        }[scope.key.value];

        if (scope.key.value === 'AC') {
          scope.$on('key.change', function(event, changeTo) {
            scope.display = $sce.trustAsHtml(changeTo);
          });
        }

      } else if (scope.key.keyType === 'operation') {
        scope.display = {
          'x': $sce.trustAsHtml('x'),
          '+': $sce.trustAsHtml('+'),
          '=': $sce.trustAsHtml('='),
          '/': $sce.trustAsHtml('&divide;'),
          '-': $sce.trustAsHtml('&mdash;'),
        }[scope.key.value];
      }

      scope.keyClicked = function(key) {
        scope.$emit('clicked', key);
      }

      if (scope.key.keyType === 'operation') {
        scope.$on('key.pressed', opKeyPressed);
        scope.$on('key.release', opKeyReleased);
      } else {
        scope.$on('key.pressed', regularKeyPressed);
        scope.$on('key.release', regularKeyReleased);
      }

      function opKeyPressed(event, key) {
        scope.isSelected = false;

        if (key.value == scope.key.value) {
          scope.isPressed  = true;
          scope.isSelected = true;
        }
      }

      function opKeyReleased(event, key) {
        if (key.value == scope.key.value) {
          scope.isPressed  = false;
        }
      }

      function regularKeyReleased(event, key) {
        if (key.value == scope.key.value) {
          scope.isPressed = false;
        }
      }

      function regularKeyPressed(event, key) {
        if (key.value == scope.key.value) {
          scope.isPressed = true;
        }
      }

      if (scope.key.value === '0') {
        elem.addClass('long-key');
      }
    }
  };
}]);
