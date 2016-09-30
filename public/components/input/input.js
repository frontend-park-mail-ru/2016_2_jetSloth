(function () {
    'use strict';

    class Input {
        constructor (type, name, title) {
	    this.body = document.createElement('div');

	    this.title = document.createElement('div');
 	    this.className = "startInput";
	    this.title.innerHTML = title;

	    this.title = document.createElement('div');
 	    this.className = "endInput";
	    this.title.innerHTML = title;

	    this.input = document.createElement('input');
	    this.input.setAttribute("type", type);
	    this.input.setAttribute("name", name);
	    this.input.className = 'validInput';
         
	    this.body.appendChild(this.title);
	    this.body.appendChild(this.input);
		
	    return this.body;
   
        }
	valid (bool) {
		this.input.className = bool?'validInput':'invalidInput';
	}
    }

    //export
    window.Input = Input;

})();
