(function () {
    'use strict';

    // import
    //TODO
    const Block = window.Block;
    const Router = window.Router;

    class Main extends Block {
        constructor({data, el}) {
            super('div');
            this.router = new Router();
            this.template = function () {
                return `<div class="content login-page-content">
                        <button class="btn btn-register">SIGN UP</button>
                        <img src="img/login-background-img.png"/>
                        <button class="btn btn-login">SIGN IN</button>
                        </div>`
            };
            this.data = data;
            this._el = el;
        }

        init() {
        }

        render() {
            this._el.innerHTML = this.template();
        }

        subscribe() {
            this._el.onclick = function (event) {
                event.stopPropagation();
                if (event.target.classList.contains("btn-login")) {
                    this.router.go('/signIn');
                }
                else if (event.target.classList.contains("btn-register")) {
                    this.router.go('/signUp');
                };
                /**/
            }.bind(this);
        }
    }

    //export
    window.Main = Main;
})();
