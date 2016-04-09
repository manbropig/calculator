app.factory('Calculator', [function() {

  function Calculator() {
    this.lastInput = null;
    this.lastNumber = 0;
    this.keys = [];
  }

  Calculator.prototype.add = function() {

  }

  Calculator.prototype.subtract = function() {}
  Calculator.prototype.multiply = function() {}
  Calculator.prototype.divide = function() {}
  Calculator.prototype.negate = function() {}
  Calculator.prototype.percent = function() {}
  Calculator.prototype.clear = function() {}
  Calculator.prototype.allClear = function() {}
  Calculator.prototype.calculate = function() {}

  return Calculator;
}])
