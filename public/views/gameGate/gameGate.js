'use strict';

import View from '../../modules/view'
import Block from '../../components/block/block'
import GameGate from '../../components/gameGate/gameGate'

export default class GameGateView extends View {
    constructor() {
        super();
    }
    init() {
        this.setClasses(['content', 'js-gameGate']);
		this._el = document.createElement('div');
		this._el.setAttribute('width', 1400);
		this._el.setAttribute('height', 650);
        this.game = new GameGate(this._el);
        document.querySelector('.gameGate').appendChild(this._el);
    }

}
