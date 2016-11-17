'use strict';

import Block from '../block/block'
import Button from '../button/button'
import Router from '../../modules/router'

export default class Form extends Block {
    constructor(options = {data: {}}) {
        super('form');
        this.template = window.fest['form/form.tmpl'];
        this.data = options.data;
        this._el = options.el;
        this.valid = true;
        this.render();
        this.on('click', event => {
            if (event.target.classList.contains("fa-times-circle")) {
                (new Router).go('/');
            }
        });

        this.on('submit', event => {
            event.preventDefault();
            this.isValid();
        });
    }

    render() {
        this._updateHtml();
        this._installControls();
    }

    reset() {
        this._el.querySelector('form').reset();
    }

    _updateHtml() {
        this._el.innerHTML = this.template(this.data);
    }


    _installControls() {

        let {controls = []} = this.data;

        controls.forEach(data => {
            let control = new Button({
                text: data.text,
                attrs: data.attrs
            });
            this._el.querySelector('.js-controls').appendChild(control._get());
        });
    }

    getFormData() {
        let form = this._el.querySelector('form');
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

    showErr(field, errMsg) {
        field.innerHTML = errMsg;
    }

    resetErr(field) {
        field.innerHTML = '';
    }

    validate() {
        let form = this._el.querySelector('form');
        let elements = form.elements;

        this.resetErr(form.querySelector('.error-username'));
        if (elements.username.value.length === 0) {
            this.showErr(form.querySelector('.error-username'), 'Минимум 1 символ');
            this.valid = false;
        }
        this.resetErr(form.querySelector('.error-password'));
        if (elements.password.value.length < 3) {
            this.showErr(form.querySelector('.error-password'), 'Мимимум 6 символов');
            this.valid = false;
        }
        this.resetErr(form.querySelector('.error-secured_password'));
        if ('secured_password' in elements && form.password.value !== form['secured_password'].value) {
            this.showErr(form.querySelector('.error-secured_password'), 'Пароли не совпадают');
            this.valid = false;
        }

        return valid;
    }

    isValid() {
        this.validate();
    }
}
