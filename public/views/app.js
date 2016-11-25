'use strict';

import Game from '../components/game/game'
import View from '../modules/view'
import template from '../templates/app.pug'
import Block from '../components/block/block'


export default class AppView extends View {
    constructor() {
        super();
    }
    init() {
        this.setClasses(['content', 'js-app']);
		this._el = document.createElement('canvas');
		this._el.setAttribute('width', 1200);
		this._el.setAttribute('height', 650);
        this.game = new Game(this._el, 'ws://127.0.0.1:8081');
        document.querySelector('.app').appendChild(this._el);
    }

}
