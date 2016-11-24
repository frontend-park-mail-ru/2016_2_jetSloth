'use strict';

import Form from '../components/form/form'
import LinkedButton from '../components/linkedButton/linkedButton'
import View from '../modules/view'
import template from '../templates/signin.pug'

export default class SignInView extends View {
    constructor() {
        super();
    }

    init() {
        this.setClasses(['content', 'js-signin']);

        this.form = new Form({
            data: {
                fields: [{
                    name: 'username',
                    type: 'text',
                    label: 'Enter username'
                }, {
                    name: 'password',
                    type: 'password',
                    label: 'Enter password'
                }],
                controls: [{
                    text: 'enter',
                    classes: ['button', 'btn', 'btn-submit'],
                    attrs: {
                        type: 'submit'
                    }
                }, {
                    text: 'reset',
                    classes: ['button', 'btn', 'btn-reset'],
                    attrs: {
                        type: 'reset'
                    }
                }]
            }
        });

        this.signUpBtn = new LinkedButton({
            text: 'sign up',
            url: '/signup',
            classes: ['button', 'btn', 'btn-signup']
        });

        this._el.innerHTML = template();

        this._el.querySelector('.form').appendChild(this.form._get());
        this._el.querySelector('.sign-up-control').appendChild(this.signUpBtn._get());
        document.querySelector('.app').appendChild(this._el);

    }

    pause() {
        this.hide();
        this.form.reset();
    }
}
