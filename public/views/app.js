'use strict';

import View from '../modules/view'
import template from '../templates/app.pug'
import Block from '../components/block/block'


export default class AppView extends View {
    constructor() {
        super();
    }
    init() {
        this.setClasses(['content', 'js-app']);
        this.block = new Block('div');
        this.block.setClasses(['pam-pam']);

        this._el.innerHTML = template();

        this._el.querySelector('.block').appendChild(this.block._get());

        document.querySelector('.app').appendChild(this._el);
    }

}
