'use strict';

import Block from '../block/block'
import Button from '../button/button'
import LinkedButton from '../linkedButton/linkedButton'
import template from '../../templates/components/main.pug'

export default class Menu extends Block {
    constructor(options = {}) {
        super('div');
        this._el = options.el;
        this._items = options.items;
        this.render();
    }

    render() {
        this._updateHtml();
        this._installItems();
    }

    _updateHtml() {
        this._el.innerHTML = template();
    }

    _installItems() {
        this._items.forEach(item => {
            let control = new LinkedButton({
                text: item.text,
                url: item.url,
                classes: item.classes,
                attrs: item.attrs
            });
            this._el.querySelector('.menu').appendChild(control._get());
        });
    }
}
