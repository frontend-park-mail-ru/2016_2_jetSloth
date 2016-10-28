(function () {
    'use strict';

    // import
    //TODO
    const Form = window.Form;
    const Block = window.Block;
    const SignInModel = window.SignInModel;
    const Router = window.Router;

    class SignIn extends Block {
        constructor({data, el}) {
            super('div');
            this._el = el;
            this.data = data;
            this._prepareHtml();
            this.form = new Form({
                el: this._el.querySelector('.modal-window-login'),
                data: {
                    class: 'login-form-modal',
                    fields: [
                        {
                            name: 'username',
                            type: 'text',
                            placeholder: 'username'
                        },
                        {
                            name: 'password',
                            type: 'text',
                            placeholder: 'password'
                        }
                    ],
                    controls: [
                        {
                            text: 'SIGN IN',
                            class: 'btn-login',
                            attrs: {
                                type: 'submit'
                            }
                        }
                    ]
                }
            });
            this.router = new Router();
            this.template = function () {
            };
            this.init();
            this.render();
        }

        init() {
            this.form.on('submit', this._sendUserData.bind(this));

        }

        render() {
            this.form.render();
        }

        _prepareHtml() {
            this._el.innerHTML = `<div class ="modal-window modal-window-login"></div>`;
        }

        _sendUserData(event) {
            event.preventDefault();
            let data = {
                username: this.form.getFormData().username,
                password: this.form.getFormData().password
            };
            let model = new SignInModel(data);
            model.sendPost().then(function (data) {
                this.router.go("pregame")
            }.bind(this), function () {
                console.log("wrong password or username")
            });
        }

        // subscribe() {
        //     this._el.onclick = function (event) {
        //         event.stopPropagation();
        //         if (event.target.classList.contains("modal-close")) {
        //             this.router.back();
        //         }
        //     }.bind(this);
        // }
    }

    //export
    window.SignIn = SignIn;
})();
