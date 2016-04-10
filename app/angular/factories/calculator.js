app.factory('Calculator', ['Symbols', function(Symbols) {

  function Calculator() {
    this.nextOp = null;
    this.currNum = '';
    this.currCalc = '';
    this.newNumberPhase = true;
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
    this.currNum = this.newNumberPhase ? number : this.currNumber + number;
    this.currCalc += number;
    this.newNumberPhase = false;
    return this.currNum;
  }

  Calculator.prototype.processOp = function(op) {
    this.newNumberPhase = true;
    this.nextOp = op;
    if (op !== '=') {
      var match = Symbols.OPS_REGEX.exec(this.currCalc);
      if (match) { //check if currCalc already has an ops sign in it

        if (match.index === this.currCalc.length - 1) {
          this.currCalc = this.currCalc.substr(0, this.currCalc.length - 1) + op;
        } else {
          this.currNum = eval(this.currCalc); //turn 3+2+1
          this.currCalc = this.currNum + op;  //into 5+1
          return this.currNum; //return 5
        }
      } else {
        this.currCalc = this.currNum + op;
      }
    }
    this.currCalc = this.currCalc.toString().replace(/x/g, '*').replace(/[^-()\d\/*+.]/g, '');
    try { //try to do a calculation
      this.currNum = eval(this.currCalc);
    } catch (e) {
      this.currNum = '';
    }
    return this.currNum;
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
