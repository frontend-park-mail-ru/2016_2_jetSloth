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
        let form = new Form({
			formType: 'signIn',
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

        let signUpBtn = new LinkedButton({
            text: 'sign up',
            url: '/signup',
            classes: ['button', 'btn', 'btn-signup']
        });

        this._el.appendChild(form._get());
        this._el.appendChild(signUpBtn._get());
        document.querySelector('.app').appendChild(this._el);
    }
}
