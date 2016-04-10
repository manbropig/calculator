app.constant('Symbols', {
  numbers: '7894561230'.split('').map(function(num) {
    return { value: num, keyType: 'number' };
  }),
  modifiers: 'AC +/- %'.split(' ').map(function(num) {
    return { value: num, keyType: 'modifier' };
  }),
  operations: '/x-+='.split('').map(function(num) {
    return { value: num, keyType: 'operation' };
  }),
  decimal:  { value: '.', keyType: 'decimal' },
  OPS_REGEX: /[-()\+\-*\/]/g
});
