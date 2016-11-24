'use strict';
import Block from '../block/block'
import Button from '../button/button'
import Input from '../input/input'
import Router from '../../modules/router'
import template from '../../templates/components/form.pug'
import User from '../../models/user'


export default class Form extends Block {
    constructor(options = {
        formType, data: {}
    }) {
        super('form');
		this.formType = options.formType;
        this.data = options.data;
        this.render();
    }

    render() {
        this._updateHtml();
        this._installFields();
        this._installControls();
        this._setListeners();
    }

    reset() {
        let inputs = this._el.querySelectorAll('input');

        inputs.forEach(input => {
            let parent = input.parentElement;
            let err = parent.parentElement.querySelector('.error');
            parent.classList.remove('active', 'valid', 'invalid');
            input.value = '';
            err.innerHTML = '';
        });
    }

    _updateHtml() {
        this._el.innerHTML = template(this.data);
    }

    _installFields() {
        let {
            fields = []
        } = this.data;

        fields.forEach(data => {
            let field = new Input({
                name: data.name,
                type: data.type,
                label: data.label
            });
            this._el.querySelector('.form__fields').append(field._get());
        });
    }

    _installControls() {
        let {
            controls = []
        } = this.data;

        controls.forEach(data => {
            let control = new Button({
                text: data.text,
                classes: data.classes,
                attrs: data.attrs
            });
            this._el.querySelector('.form__controls').appendChild(control._get());
        });
    }

    _setListeners() {
        let inputs = this._el.querySelectorAll('input');

        inputs.forEach(input => {
            let parent = input.parentElement;

            input.addEventListener('focus', () => {
                parent.classList.add('active');

                input.addEventListener('blur', () => {
                    if (input.value.length === 0) {
                        parent.classList.remove('active');
                    } else {
                        this.validate(input);
                    }
                });

                parent.classList.remove('valid', 'invalid');

            });
        });

        this.on('click', event => {
            if (event.target.classList.contains("close")) {
                (new Router).go('/');
            }
        });

        this.on('submit', event => {
            event.preventDefault();
            this.isValidForm();
            if (this.isValidForm()) {
				let data = {
					username: this._el.elements.username.value,
					password: this._el.elements.password.value,
					formType: this.formType
				}
				let user = new User(data);
				user.sendUser()
				.then(
                	res=>{
						res = JSON.parse(res);
						(new Router).go('/app');
					},
					err=>{
						alert("Произошла какая-то ошибка o_O");
					});
            	}
        });

        this.on('reset', event => {
            event.preventDefault();
            this.reset();
        });
    }

    isValidForm() {
        let fields = this._el.querySelectorAll('.input');
        let valid = true;
        fields.forEach(field => {
            if (!field.classList.contains('valid')) {
                valid = false;
            }
        })
        return valid;
    }

    validate(input) {
        let parent = input.parentElement;
        let err = parent.parentElement.querySelector('.error');
        let ErrMsg = this.notValid(input);

        if (ErrMsg) {
            parent.classList.add('invalid');
            parent.style.transformOrigin = "center";
            err.innerHTML = ErrMsg;
        } else {
            parent.classList.add('valid');
            parent.style.transformOrigin = "bottom";
            err.innerHTML = '';
        }
    }

    notValid(input) {
        return input.name === 'username' ? this.checkName() :
            input.name === 'password' ? this.checkPsw() :
            input.name === 'password2' ? this.confirmPsw() : null;
    }

    checkName() {
        let _username = this._el.elements.username;
        return _username.value.length > 5 ? null : 'Username must contain at least 6 symbols!';
    }

    checkPsw() {
        let _password = this._el.elements.password;
        return _password.value.length > 5 ? null : 'Password must contain at least 6 symbols!';

    }

    confirmPsw() {
        let _password = this._el.elements.password;
        let _password2 = this._el.elements.password2;
        return _password.value === _password2.value && _password.value.length > 5 ? null : 'Passwords aren\'t coincided!';
    }

    getFormData() {
        let form = this._el.querySelector('.form');
        let elements = form.elements;
        let fields = {};

        Object.keys(elements).forEach(element => {
            let name = elements[element].name;
            let value = elements[element].value;

            if (!name) {
                return;
            }
            fields[name] = value;
        });
        return fields;
    }

}
