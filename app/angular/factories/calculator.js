app.factory('Calculator', ['Symbols', function(Symbols) {

  function Calculator() {
    this.nextOp = null;
    this.currNum = '';
    this.currCalc = '';
    this.lastCalc = null;
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
    this.currNum = this.newNumberPhase ? number : this.currNum + number;
    this.currCalc += number;
    this.newNumberPhase = false;
    return this.currNum;
  }

  Calculator.prototype.processDecimal = function() {
    if (this.newNumberPhase) {
      this.newNumberPhase = false;
      this.currNum = '0.';
      this.currCalc += '.';
    } else {
      this.currNum = this.currNum.toString();
      var idx = this.currNum.indexOf('.');
      if (idx === -1) {
        this.currNum += '.';
        this.currCalc += '.';
      }
    }
    return this.currNum;
  }

  //TODO: make this less hard to read!
  Calculator.prototype.processOp = function(op) {
    this.newNumberPhase = true;
    this.nextOp = op;
    Symbols.OPS_REGEX.lastIndex = 0; //reset regex
    var match = Symbols.OPS_REGEX.exec(this.currCalc);

    if (op !== '=') {
      op = (op === 'x') ? '*' : op;
      this.lastCalc = null;
      if (match) { //check if currCalc already has an ops-sign in it
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
    } else {
      if (this.lastCalc) {
        this.currCalc = this.currNum + this.lastCalc;
      } else {
        //split currCalc from regex match
        this.lastCalc = this.currCalc.substr(this.currCalc.indexOf(match[0]), this.currCalc.length - 1);
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

  Calculator.prototype.negate = function() {
    return this.currNum *= (-1);
  }
  Calculator.prototype.percent = function() {
    return this.currNum /= 100;
  }
  Calculator.prototype.clear = function() {}
  Calculator.prototype.allClear = function() {
    Calculator.call(this);
    return 0;
  }

  return Calculator;
}])
