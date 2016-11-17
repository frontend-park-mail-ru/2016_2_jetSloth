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
                fields: [{
                    name: 'username',
                    type: 'text',
                    placeholder: 'Enter username'
                }, {
                    name: 'password',
                    type: 'password',
                    placeholder: 'Enter password'
                }],
                controls: [{
                    text: 'SIGN IN',
                    attrs: {
                        type: 'submit'
                    }
                }]
            }
        })
    }

    //16.11.16 Добавил валидацию сейчас эта функция ищет самую первую форму на странице
    //не знаю ни class ни name DOM объека
    init() {
        // alert(this._component._el.querySelector('form').elements.username.value);
        // let passwordReg = /^[\w@$#%_+-\\*\\\/!?]{6,30}$/;
        // let usernameReg = /^[\w]{4,20}$/;
        // this._component.on('submit', event => {
        //     event.preventDefault();
        //     let b = 0;
        //     if (!usernameReg.test(document.forms[0].elements.username.value)) {
        //         b += 1;
        //         alert("unvalid login");
        //     }
        //     if (!passwordReg.test(document.forms[0].elements.password.value)) {
        //         b += 1;
        //         alert("unvalid password");
        //     }
        //     if (b == 0) {
        //         this.router.go('/');
        //     }
        //
        // });
        this._component.on('submit', event => {
            let isValid = false;
            event.preventDefault();
            let form = this._component.getFormData();
            this._component.isValid(form);
        });

        // this._component.on('click', event => {
        //     event.preventDefault();
        //     if (event.target.classList.contains("fa-times-circle")) {
        //         this.router.go('/');
        //     }
        // });
    }
}
