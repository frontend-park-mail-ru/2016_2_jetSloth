'use strict';

import Form from '../components/form/form'
import View from '../modules/view'

export default class SignInView extends View {
    constructor(options = {}) {
        super(options);
        this._el = document.querySelector('.js-signin');
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
                    }
                ],
                controls: [
                    {
                        text: 'SIGN IN',
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