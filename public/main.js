'use strict';
/**
* @see http://artsiom.mezin.eu/technofront/
*/


function onSubmit (form) {

	var data = {
		user: form.elements['user'].value,
		email: form.elements['email'].value
	};

	var result = request('/users', data);

	if( result != undefined ) {
		form.hidden = true;
		window.helloWorld.innerHTML = helloUser(data.user, result);
	}

	console.log(data, result);
}

function plural (num) {

	if( num >= 2 && num <= 4 ) {
		return "раза";
	}else {
		return "раз";
	}
}

function helloUser (text, count) {
	return 'Привет, ' + text + ', вы заходили ' + count + ' раз.';
}

function hello (text) {
	return 'Привет, ' + text;
}

function filter(str) {

	let rules = window.rules || [];

	rules = rules.map( rule => {
		return {
			regex: new RegExp(rule, 'g'),
			length: rule.length
		};
	});

	rules.forEach( rule => {
		str = str.replace(rule.regex, (new Array(rule.length + 1)).join('*'))
	});


	return str;
}

if (typeof exports === 'object') {
	exports.hello = hello;
	exports.plural = plural;
	exports.filter = filter;
}
