app.factory('Calculator', [function() {

  function Calculator() {
    this.nextOp = null;
    this.currentNumber = '';
    this.currentCalculation = null;
  }

  Calculator.prototype.process = function(key) {
    var result;
    if (key.keyType === 'number') {
      result = this.processNumber(key.value);
    } else if (key.keyType === 'operation') {
      result = this.processOp(key.value);
    } else if (key.keyType === 'modifier') {
      result = this.processMod(key.value);
    } else { //decimal point
      result = this.processDecimal(key.value);
    }
    return result;
  }

  Calculator.prototype.processNumber = function(number) {
    this.currentNumber += number;
    console.log(this.currentNumber);
    return this.currentNumber;
  }

  Calculator.prototype.processOp = function(op) {
    var result;
    if (op === '=') { //calculate currentCalculation
      this.currentCalculation += this.currentNumber;
      this.currentCalculation = this.currentCalculation.replace(/x/g, '*');
      this.currentNumber = eval(this.currentCalculation.replace(/[^-()\d\/*+.]/g, ''));
      this.currentCalculation = this.currentNumber;
    } else {
      this.nextOp = op;
      this.currentCalculation = this.currentNumber + op;
      this.currentNumber = '';
    }
    return this.currentNumber;
  }

  Calculator.prototype.processMod = function() {
    return this.allClear();
  }

  Calculator.prototype.negate = function() {}
  Calculator.prototype.percent = function() {}
  Calculator.prototype.clear = function() {}
  Calculator.prototype.allClear = function() {
    Calculator.call(this);
    return 0;
  }

  return Calculator;
}])
