'use strict';

import Form from '../components/form/form'
import View from '../modules/view'

export default class SignUpView extends View {
    constructor() {
        super();
    }

    init() {
        this.setClasses(['content', 'js-signup']);

        this.signUpForm = new Form({
            title: 'sign up',
			action: 'signup',
            data: {
                fields: [{
                    name: 'username',
                    type: 'text',
                    label: 'Enter username'
                }, {
                    name: 'password',
                    type: 'password',
                    label: 'Enter password'
                }, {
                    name: 'password2',
                    type: 'password',
                    label: 'Repeat password'
                }],
                controls: [{
                    text: 'submit',
                    classes: ['btn', 'btn-submit'],
                    attrs: {
                        type: 'submit'
                    }
                }, {
                    text: 'reset',
                    classes: ['btn', 'btn-reset'],
                    attrs: {
                        type: 'reset'
                    }
                }]
            }
        });
        this._el.appendChild(this.signUpForm._get());
        document.querySelector('.app').appendChild(this._el);
    }

    pause() {
        this.hide();
        this.signUpForm.reset();
    }
}
