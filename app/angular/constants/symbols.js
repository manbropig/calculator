app.constant('Symbols', {
  numbers: '7894561230'.split('').map(function(num) {
    return { value: num, keyType: 'number' };
  }),
  modifiers: 'AC +/- %'.split(' ').map(function(mod) {
    return { value: mod, keyType: 'modifier' };
  }),
  operations: '/x-+='.split('').map(function(op) {
    return { value: op, keyType: 'operation' };
  }),
  decimal:  { value: '.', keyType: 'decimal' },
  OPS_REGEX: /[-()\+\-*\/]/g
});
