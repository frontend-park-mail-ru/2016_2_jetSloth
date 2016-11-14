'use strict';

import Block from '../block/block'

export default class Button extends Block {
    constructor(options = {}) {
        super('button', options);
        this._el.classList.add('button');
        this._el.innerText = options.text;
    }
}

