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

      if (scope.key.keyType === 'modifier') {
        scope.display = {
          'AC': $sce.trustAsHtml('AC'),
          '%': $sce.trustAsHtml('%'),
          '+/-': $sce.trustAsHtml('&plusmn;')
        }[scope.key.value];
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

      if (scope.key.value === '0') {
        elem.addClass('long-key');
      }
    }
  };
}]);
