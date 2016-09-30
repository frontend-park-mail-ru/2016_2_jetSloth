let assert = require('assert');
let filter = require('./public/main').filter;

assert.equal(filter('KEK'), '***');
assert.equal(filter('KEKER'), 'KEKER');
assert.equal(filter('ASKEK'), 'ASKEK');
assert.equal(filter('KEK MEK'), '*** MEK');
assert.equal(filter('dskl KEK'), 'dskl ***');
assert.equal(filter('KEK is KEK'), '*** is ***');
assert.equal(filter('GOOD IS BAD KEK', ['GOOD', 'BAD']), '**** IS *** KEK');
