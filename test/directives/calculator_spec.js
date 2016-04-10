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

  var calculator;
  beforeEach(function() {
    calculator = new Calculator();

  });

  describe('Input numbers', function() {

    it('initializes with newNumberPhase as true', function() {
      expect(calculator.newNumberPhase).toBeTruthy();
    })
  });

  describe('Operations', function() {

    describe('addition', function() {

      it('adds two values correctly', function() {
        calculator.currNum = '2';
        calculator.currCalc = '3+2';
        expect(calculator.processOp({value: '+'})).toEqual(5);
      });
    })

  });
});
