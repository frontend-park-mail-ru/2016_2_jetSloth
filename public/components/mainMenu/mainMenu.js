(function () {
    'use strict';

    const Block = window.Block;
    const LinkedButton = window.LinkedButton;

    class MainMenu extends Block {
        constructor(options = {}) {
            super('div', options);
            this._el = options.el;

            this._signup = new LinkedButton({
                url: '/signup',
                text: 'SIGN UP',
                classes: ['button', 'btn', 'btn-signup']
            });

            this._img = new Block('img',{
                attrs: {
                    src: 'img/login-background-img.png'
                }
            });

            this._signin = new LinkedButton({
                url: '/signin',
                text: 'SIGN IN',
                classes: ['button', 'btn', 'btn-signin']
            });
            this.append(this._signup._get());
            this.append(this._img._get());
            this.append(this._signin._get());

            // this._template = window.fest['mainMenu/mainMenu.tmpl'];
        }
    }

    window.MainMenu = MainMenu;
})();