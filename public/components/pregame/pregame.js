(function () {
	'use strict';

	// import
	//TODO
	const Block = window.Block;


	class Pregame extends Block {
		constructor({data = {messages: []}, el}) {
			super('div');
		}
	}

	//export
	window.Pregame = Pregame;
})();
