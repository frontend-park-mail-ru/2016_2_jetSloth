(function () {
    'use strict';

    const Form = window.Form;
    const View = window.View;

    class SignUpView extends View {
        constructor(options = {}) {
            super(options);
            this._el = document.querySelector('.js-signup');
            this.hide();

            this._component = new Form({
                el: this._el,
                data: {
                    fields: [
                        {
                            name: 'username',
                            type: 'text',
                            placeholder: 'Enter username'
                        },
                        {
                            name: 'password',
                            type: 'password',
                            placeholder: 'Enter password'
                        },
                        {
                            name: 'secured_password',
                            type: 'password',
                            placeholder: 'Repeat password'
                        }
                    ],
                    controls: [
                        {
                            text: 'SUBMIT',
                            attrs: {
                                type: 'submit'
                            }
                        }
                    ]
                }
            })
        }

        init() {
            this._component.on('submit', event => {
                event.preventDefault();
                this.router.go('/');
            });
        }
    }

    window.SignUpView = SignUpView;
})();