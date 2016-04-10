'use strict';

(function() {
  var sharedExamples = {};
  window.sharedExample = function(name, testFn) {
    if (this && this.description) {
      if (!sharedExamples[this.description]) {
        sharedExamples[this.description] = {};
      }

      sharedExamples[this.description][name] = testFn;
    } else {
      sharedExamples[name] = testFn;
    }
  };

  window.itBehavesLike = function(name) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();

    var _this = this;

    describe('behaves like ' + name, function() {
      var test = findTest(name, _this);

      if (test) {
        test.apply(null, args);
      } else {
        throw new Error('Could not find a test for "' + name + '"');
      }
    });
  };

  function findTest(name, suiteObj) {
    while(suiteObj && (!sharedExamples[suiteObj.description] || !sharedExamples[suiteObj.description][name])) {
      if (suiteObj.parentSuite.id) {
        suiteObj = suiteObj.parentSuite;
      } else {
        suiteObj = null;
      }
    }

    if (suiteObj) {
      return sharedExamples[suiteObj.description][name];
    } else {
      return sharedExamples[name];
    }
  }
})(window);
