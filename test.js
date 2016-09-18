let assert = require('assert');
let hello = require('./public/main').hello;
let plural = require('./public/main').plural;
let filter = require('./public/main').filter;


/*
assert.equal(plural(0), 'раз');
assert.equal(plural(1), 'раз');
assert.equal(plural(2), 'раза');
assert.equal(plural(13), 'раз');
assert.equal(plural(15), 'раз');
assert.equal(plural(100), 'раз');
*/

/*
global.window = {
    rules: ['orange', 'apple']
}

assert.equal(filter('orange'), '******');
assert.equal(filter('orange sdasdasd'), '****** sdasdasd');
assert.equal(filter('sdasdasd orange'), 'sdasdasd ******');
assert.equal(filter('orangesdasdasd'), '******sdasdasd');

assert.equal(hello('Test'), 'Привет, Test');
*/

//TODO: Кейсы для функции filter
// assert.equal(filter('КЕК'), '***');
