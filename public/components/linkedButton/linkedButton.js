'use strict';

import Block from '../block/block'
import Button from '../button/button'
import Router from '../../modules/router'

export default class LinkedButton extends Block {
    constructor(options = {}) {
        super('button', options);
        this._el.innerText = options.text;
        this.setLink(options.url);
    }

    setLink(url) {
        this.on('click', event => {
            event.preventDefault();
            (new Router).go(url);
        })
    }
}