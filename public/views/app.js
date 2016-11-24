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

        this._get().innerHTML = template();

        document.querySelector('.app').appendChild(this._get());
    }

}
