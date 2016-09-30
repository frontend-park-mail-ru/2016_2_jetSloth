(function() {
    'use strict';

    class Button {
        constructor(type, name, title) {
            this.body = document.createElement('div');
            this.input = document.crateElement('input');
            this.input.setAttribute("type", type);
            this.input.setAttribute("name", name);
            this.title = document.crateElement('input');
            this.title.innerHTML = title;

            this.body.appendChild(this.title);
            this.body.appendChild(this.input);

            return body;

        }
        valid(bool) {
            this.input.className = bool ? 'validInput' : 'invalidInput';
        }
    }

    //export
    if (typeof exports === 'object') { // for NodeJS
        exports.Button = Button;
    } else {
        window.Button = Button;
    }


})();
