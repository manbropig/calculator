'use strict';

describe('Factory: Calculator', function() {
  beforeEach(module('CalculatorApp'));

  var Calculator;
  var calculator;
  beforeEach(inject(function(_Calculator_) {
    Calculator = _Calculator_;
  }));

  beforeEach(function() {
    calculator = new Calculator();
  });

  it('exists', function() {
    expect(calculator).not.toBe(null);
  });

  describe('Input numbers', function() {

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

    sharedExample('operation', function(opts) {

      it('inputs the operation correctly', function() {
        calculator.process({value: opts.num1, keyType: 'number'});
        calculator.process({value: opts.op, keyType: 'operation'});
        opts.op = opts.op === 'x' ? '*' : opts.op;
        expect(calculator.currCalc).toEqual(opts.num1 + opts.op);
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

      it('inputs the = correctly for decimal inputs', function() {
        calculator.process({value: opts.num1, keyType: 'number'});
        calculator.process({value: '.', keyType: 'decimal'});
        calculator.process({value: '0', keyType: 'number'});
        calculator.process({value: opts.op, keyType: 'operation'});
        calculator.process({value: opts.num2, keyType: 'number'});
        calculator.process({value: '=', keyType: 'operation'});
        opts.op = opts.op === 'x' ? '*' : opts.op;
        expect(calculator.currNum).toEqual(opts.expectedOutput);
        expect(calculator.currCalc).toEqual(opts.num1 + '.0' + opts.op + opts.num2);
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
    });

    itBehavesLike('operation', { num1: '2',  op: '+', num2: '3', expectedOutput: 5  });
    itBehavesLike('operation', { num1: '2',  op: '-', num2: '3', expectedOutput: -1 });
    itBehavesLike('operation', { num1: '2',  op: 'x', num2: '3', expectedOutput: 6  });
    itBehavesLike('operation', { num1: '12', op: '/', num2: '3', expectedOutput: 4  });
  });

  describe('Modifiers', function() {

    describe('AC', function() {
      it('resets the calculator', function() {
        calculator.process({value: '3', keyType: 'number'});
        calculator.process({value: 'AC', keyType: 'modifier'});
        calculator.process({value: 'AC', keyType: 'modifier'});
        expect(calculator.currNum).toEqual('');
        expect(calculator.currCalc).toEqual('');
        expect(calculator.lastCalc).toBeNull();
        expect(calculator.newNumberPhase).toEqual(true);
      });
    });

    describe('C', function() {
      it('resets the calculator', function() {
        calculator.process({value: '3', keyType: 'number'});
        calculator.process({value: 'AC', keyType: 'modifier'});
        expect(calculator.currNum).toEqual('0');
        expect(calculator.currCalc).toEqual('0');
        expect(calculator.lastCalc).toBeNull();
        expect(calculator.newNumberPhase).toEqual(true);
      });
    });

    describe('+/-', function() {
      it('negates the current value', function() {
        calculator.process({value: '2', keyType: 'number'});
        calculator.process({value: '+/-', keyType: 'modifier'});
        expect(calculator.currNum).toEqual(-2);
        expect(calculator.currCalc).toEqual('(-2)');
        calculator.process({value: '+/-', keyType: 'modifier'});
        expect(calculator.currNum).toEqual(2);
        expect(calculator.currCalc).toEqual('((2))');
      });
    });

    describe('%', function() {
      it('divides the current value by 100', function() {
        calculator.process({value: '2', keyType: 'number'});
        calculator.process({value: '%', keyType: 'modifier'});
        expect(calculator.currNum).toEqual(0.02);
      });
    });
  });
});
