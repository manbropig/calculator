app.factory('Calculator', ['Symbols', function(Symbols) {

  function Calculator() {
    this.currNum = '';
    this.currCalc = '';
    this.lastCalc = null;
    this.newNumberPhase = true;
    this.allClearFlag = true; //if true => AC else C
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
    this.currNum = this.currNum.toString();
    this.currNum = this.newNumberPhase ? number : this.currNum + number;
    this.currCalc += number;
    this.newNumberPhase = false;
    this.allClearFlag = false;
    return this.currNum;
  }

  Calculator.prototype.processDecimal = function() {
    this.allClearFlag = false;
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
    this.currCalc = this.currCalc.toString();
    Symbols.OPS_REGEX.lastIndex = 0; //reset regex
    var match = Symbols.OPS_REGEX.exec(this.currCalc);

    if (op !== '=') {
      op = (op === 'x') ? '*' : op;
      this.lastCalc = null;
      if (match) { //check if currCalc already has an ops-sign in it

        if (match.index === this.currCalc.length - 1) {
          this.currCalc = this.currCalc.substr(0, this.currCalc.length - 1) + op;
        } else {
          try {
            this.currNum = eval(this.currCalc); //turn 3+2+1
            this.currCalc = this.currNum + op;  //into 5+1
          } catch(e) {
            this.currNum = '';
          }
          return this.currNum; //return 5
        }

      } else {
        this.currCalc = this.currNum + op;
      }

    } else { //op === '='

      if (this.lastCalc) {
        this.currCalc = this.currNum + this.lastCalc;
      } else { //split currCalc from regex match
        if (match) {
          this.lastCalc = this.currCalc.substr(this.currCalc.indexOf(match[0]), this.currCalc.length - 1);
        }
      }

    }
    this.currCalc = this.currCalc.replace(/x/g, '*').replace(/[^-()\d\/*+.]/g, '');
    try { //try to do a calculation
      this.currNum = eval(this.currCalc);
    } catch (e) {
      this.currNum = '';
    }
    return this.currNum;
  }

  Calculator.prototype.processMod = function(mod) {
    var result;
    if (mod === 'AC') {
      result = this.clearCalc();
    } else if (mod === '+/-') {
      result = this.negate();
    } else { //%
      result = this.percent();
    }
    return result;
  }

  Calculator.prototype.negate = function() {
    var old = this.currNum;
    this.currNum *= (-1);
    if (this.currCalc.toString().indexOf(old) === -1) {
      this.currCalc = this.currNum;
    } else {
      this.currCalc = this.currCalc.toString().replace(old, '(' + this.currNum.toString() + ')');
    }
    return this.currNum;
  }

  Calculator.prototype.percent = function() {
    this.currNum /= 100;
    this.currCalc = this.currNum;
    return this.currNum;
  }

  Calculator.prototype.clearCalc = function() {
    if (this.allClearFlag) {
      return this.allClear();
    } else {
      this.allClearFlag = true; //next time will allClear()
      Symbols.OPS_REGEX.lastIndex = 0; //reset regex
      var match = Symbols.OPS_REGEX.exec(this.currCalc);
      if (match && match.index !== this.currCalc.toString().length - 1) {
        var parts = this.currCalc.toString().split(match[0]);
        this.currCalc = parts[0] + ((parts[1]) ? match[0] : '');
      } else {
        this.currNum = '0';
        this.currCalc = this.currNum;
      }
      this.newNumberPhase = true;
      return '0';
    }
  }
  Calculator.prototype.allClear = function() {
    Calculator.call(this);
    return 0;
  }

  return Calculator;
}])
