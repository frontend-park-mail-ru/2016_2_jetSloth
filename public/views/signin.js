'use strict';

import Form from '../components/form/form'
import LinkedButton from '../components/linkedButton/linkedButton'
import View from '../modules/view'

export default class SignInView extends View {
    constructor() {
        super();
    }

    init() {
        this._el.classList.add('content', 'js-signin');
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

        this._el.appendChild(this.form._get());
        this._el.appendChild(this.signUpBtn._get());
        document.querySelector('.app').appendChild(this._el);

    }

    pause() {
        alert('hi');
        this.hide();
        this.form.reset();
    }
}
