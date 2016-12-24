'use strict';

import Form from '../../components/form/form'
import View from '../../modules/view'

export default class SignUpView extends View {
    constructor() {
        super();
    }

    init() {
        this.setClasses(['content', 'js-signup']);

        this.signUpForm = new Form({
            title: 'sign up',
            classes: ['form', 'form-signup'],
            action: 'signup',
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
                }, {
                    label: 'Repeat password',
                    attrs: {
                        name: 'password2',
                        type: 'password'
                    }
                }],
                controls: [{
                    text: 'submit',
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
        this._el.appendChild(this.signUpForm._get());
        document.querySelector('.app').appendChild(this._el);
    }

    pause() {
        this.hide();
        this.signUpForm.resetForm();
    }
}
