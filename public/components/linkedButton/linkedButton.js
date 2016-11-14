(function () {
    'use strict';

    const Block = window.Block;
    const Button = window.Button;
    const Router = window.Router;

    class LinkedButton extends Block {
        constructor(options = {}) {
            super('button', options);
            this._el.innerText = options.text;
            this.setLink(options.url);
        }

        setLink(url) {
            this.on('click', event => {
                event.preventDefault();
                (new Router).go(url);
            })
        }
    }

    window.LinkedButton = LinkedButton;
})();
