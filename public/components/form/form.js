'use strict';

import Block from '../block/block'
import Button from '../button/button'
import Input from '../input/input'

export default class Form extends Block {
    constructor(options = {data: {}}) {
        super('form');
        this.template = window.fest['form/form.tmpl'];
        this.data = options.data;
        this._el = options.el;
        this.render();
    }

    render() {
        this._updateHtml();
        this._installItems();
    }

    reset() {
        this._el.querySelector('form').reset();
    }

    _updateHtml() {
        this._el.innerHTML = this.template(this.data);
    }


    _installItems() {
        let {fields = []} = this.data;

        fields.forEach(data => {
            let input = new Input({
                attrs: {
                    type: data.type,
                    name: data.name,
                    placeholder: data.placeholder
                }
            });
            this._el.querySelector('.js-inputs').appendChild(input._get());

        });

        let {controls = []} = this.data;

        controls.forEach(data => {
            let control = new Button({
                text: data.text,
                attrs: data.attrs
            });
            this._el.querySelector('.js-controls').appendChild(control._get());
        });
    }

    showErr(field, errMsg) {
        let err = new Block('span', {
            classes: ['error-message']
        });
        err.innerHTML = errMsg;
        field.append(err);
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
}
