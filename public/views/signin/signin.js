'use strict';

import Form from '../../components/form/form'
import LinkedButton from '../../components/linkedButton/linkedButton'
import View from '../../modules/view'
import template from './signin.pug'

export default class SignInView extends View {
    constructor() {
        super();
    }

    init() {
        this.setClasses(['content', 'js-signin']);
        this.signInForm = new Form({
            title: 'sign in',
            classes: ['form', 'form-signin'],
			action: 'signin',
            data: {
                fields: [{
                    label: 'Enter username',
                    attrs: {
                        name: 'username',
                        type: 'text'
                    }
                }, {
                    label: 'Enter password',
                    attrs: {
                        name: 'password',
                        type: 'password'
                    }
                }],
                controls: [{
                    text: 'enter',
                    classes: ['btn', 'btn_submit'],
                    attrs: {
                        type: 'submit'
                    }
                }, {
                    text: 'reset',
                    classes: ['btn', 'btn_reset'],
                    attrs: {
                        type: 'reset'
                    }
                }]
            }
        });

        this.signUpBtn = new LinkedButton({
            text: 'sign up',
            url: '/signup',
            classes: ['btn', 'btn_signup']
        });

        this._el.innerHTML = template();
        this._el.querySelector('.form_sign-in').appendChild(this.signInForm._get());
        this._el.querySelector('.sign-up-control').appendChild(this.signUpBtn._get());
        document.querySelector('.app').appendChild(this._el);

    }

    pause() {
        this.hide();
        this.signInForm.resetForm();
    }
}
