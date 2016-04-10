'use strict';

describe('Factory: Calculator', function() {
  beforeEach(module('CalculatorApp'));

  var Calculator;
  beforeEach(inject(function(_Calculator_) {
    Calculator = _Calculator_;
  }));

  it('exists', function() {
    expect(new Calculator()).not.toBe(null);
  });


  describe('Input numbers', function() {
    var calculator;
    beforeEach(function() {
      calculator = new Calculator();
    });

    it('initializes with newNumberPhase as true', function() {
      expect(calculator.newNumberPhase).toBeTruthy();
    });

    sharedExample('inputs', function(options) {
      it(options.desc, function() {
        options.amount = options.amount || 1;
        for (var i = 0; i < options.amount; i++) {
          calculator.process(options.key);
        }
        expect(calculator.currNum).toEqual(options.num);
        expect(calculator.currCalc).toEqual(options.calc);
        expect(calculator.newNumberPhase).toBeFalsy();
      });
    });

    itBehavesLike('inputs', {desc: '1 number',   key: {value: '1', keyType: 'number'},  num: '1',  calc: '1'});
    itBehavesLike('inputs', {desc: '1 decimal',  key: {value: '.', keyType: 'decimal'}, num: '0.', calc: '.'});
    itBehavesLike('inputs', {desc: '2 decimals', key: {value: '.', keyType: 'decimal'}, num: '0.', calc: '.', amount: 2});

  });

  describe('Operations', function() {
    var calculator;
    beforeEach(function() {
      calculator = new Calculator();
    });

    sharedExample('operation', function(opts) {
      it('inputs the first number correctly', function() {
        calculator.process({value: opts.num1, keyType: 'number'});
        expect(calculator.currNum).toEqual(opts.num1);
      });

      it('inputs the operation correctly', function() {
        calculator.process({value: opts.num1, keyType: 'number'});
        calculator.process({value: opts.op, keyType: 'operation'});
        opts.op = opts.op === 'x' ? '*' : opts.op;
        expect(calculator.currCalc).toEqual(opts.num1 + opts.op);
      });

      it('inputs the second number correctly', function() {
        calculator.process({value: opts.num1, keyType: 'number'});
        calculator.process({value: opts.op, keyType: 'operation'});
        calculator.process({value: opts.num2, keyType: 'number'});
        opts.op = opts.op === 'x' ? '*' : opts.op;
        expect(calculator.currNum).toEqual(opts.num2);
        expect(calculator.currCalc).toEqual(opts.num1 + opts.op + opts.num2);
      });

      it('inputs the = correctly', function() {
        calculator.process({value: opts.num1, keyType: 'number'});
        calculator.process({value: opts.op, keyType: 'operation'});
        calculator.process({value: opts.num2, keyType: 'number'});
        calculator.process({value: '=', keyType: 'operation'});
        opts.op = opts.op === 'x' ? '*' : opts.op;
        expect(calculator.currNum).toEqual(opts.expectedOutput);
        expect(calculator.currCalc).toEqual(opts.num1 + opts.op + opts.num2);
      });

      it('inputs another operation correctly', function() {
        calculator.process({value: opts.num1, keyType: 'number'});
        calculator.process({value: opts.op, keyType: 'operation'});
        calculator.process({value: opts.num2, keyType: 'number'});
        calculator.process({value: '+', keyType: 'operation'});
        opts.op = opts.op === 'x' ? '*' : opts.op;
        expect(calculator.currNum).toEqual(opts.expectedOutput);
        expect(calculator.currCalc).toEqual(opts.expectedOutput + '+');
      });

      it('applies the next operation correctly', function() {
        calculator.process({value: opts.num1, keyType: 'number'});
        calculator.process({value: opts.op, keyType: 'operation'});
        calculator.process({value: opts.num2, keyType: 'number'});
        calculator.process({value: '+', keyType: 'operation'});
        opts.op = opts.op === 'x' ? '*' : opts.op;
        expect(calculator.currNum).toEqual(opts.expectedOutput);
        expect(calculator.currCalc).toEqual(opts.expectedOutput + '+');
      });
    });

    itBehavesLike('operation', { num1: '2',  op: '+', num2: '3', expectedOutput: 5  });
    itBehavesLike('operation', { num1: '2',  op: '-', num2: '3', expectedOutput: -1 });
    itBehavesLike('operation', { num1: '2',  op: 'x', num2: '3', expectedOutput: 6  });
    itBehavesLike('operation', { num1: '12', op: '/', num2: '3', expectedOutput: 4  });

  });
});
