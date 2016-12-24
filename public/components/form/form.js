'use strict';
import Block from '../block/block'
import Button from '../button/button'
import Input from './__input/__input.js'
import Router from '../../modules/router'
import template from './form.pug'
import User from '../../models/user'


export default class Form extends Block {
    constructor(options = { action, data: {} }) {
        super('form', options);

        this.action = options.action;
        this.data = options.data;

        this.render();
    }

    render() {
        this._updateHtml();
        this._initFields();
        this._initControls();
        this._setListeners();
    }

    _updateHtml() {
        this._el.innerHTML = template();
    }

    _initFields() {
        let {
            fields = []
        } = this.data;
        this.fields = {};
        fields.forEach(data => {
            let input = new Input({
                label: data.label,
                attrs: data.attrs
            })
            this.fields[data.attrs.name] = input;
            this._el.querySelector('.js-fields').appendChild(input._get());
        })
    }

    _initControls() {
        let {
            controls = []
        } = this.data;
        controls.forEach(data => {
            let control = new Button({
                text: data.text,
                classes: data.classes,
                attrs: data.attrs
            })
            this._el.querySelector('.js-controls').appendChild(control._get());
        })
    }
	
    _setListeners() {
        this.on('reset', event => {
            event.preventDefault();
            this.resetForm();
        })
		
        this.on('submit', event => {
			event.preventDefault();
    		(new Router).go('/gameGate');
        })

        this._el.querySelector('.close').addEventListener('click', () =>{
            (new Router).go('/');
        })

        Object.keys(this.fields).forEach(name => {
            this.fields[name].field.addEventListener('focus', () => {
                this.fields[name].active();
            })
            this.fields[name].field.addEventListener('blur', () => {
                this.validate();

            })
        })
    }

    validate() {
        this.action === 'signin' ? this.signInCheck() : this.signUpCheck();
    }

    signInCheck() {
        let username = this.fields['username'];
        let password = this.fields['password'];

        username.isEmpty() ? username.resetActive() : this.isValidUsername(username);
        password.isEmpty() ? password.resetActive() : this.isValidPassword(password);
    }

    signUpCheck() {
        let username = this.fields['username'];
        let password = this.fields['password'];
        let password2 = this.fields['password2'];

        username.isEmpty() ? username.resetActive() : this.isValidUsername(username);
        password.isEmpty() ? password.resetActive() : this.isValidPassword(password);
        password2.isEmpty() ? password2.resetActive() : this.isSamePasswords(password, password2);
    }

    isValidUsername(username) {
        let re = /^\w{6,10}$/;
        re.test(username.field.value) ? username.valid() :
            username.invalid('Bad name. It should contain 6-10 symbols!');
    }

    isValidPassword(password) {
        let re = /^\w{6,20}$/;
        re.test(password.field.value) ? password.valid() :
            password.invalid('Bad password. It should contain 6-20 symbols!');
    }

    isSamePasswords(password1, password2) {
        password1.field.value === password2.field.value ? password2.valid() :
            password2.invalid('Passwords doesn\'t match! Please, try again.');
    }

    resetForm() {
        Object.keys(this.fields).forEach(name => {
            this.fields[name].reset();
        })
    }

    getFormData() {
        let form = this._el;
        let elements = form.elements;
        let fields = {};

        fields.username = elements.username.value;
        fields.password = elements.password.value;
        fields.action = this._action;

        return fields;
    }

}
