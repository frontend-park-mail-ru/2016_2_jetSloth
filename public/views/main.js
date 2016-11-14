'use strict';

import View from '../modules/view'
import MainMenu from '../components/mainMenu/mainMenu'

export  default class MainView extends View {
    constructor(options = {}) {
        super(options);
        this._el = document.querySelector('.js-main');
    }

    init() {
        this._component = new MainMenu(
            {
                el: this._el
            });
    }
}
