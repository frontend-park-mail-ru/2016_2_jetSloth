'use strict';

import View from '../modules/view'
import Menu from '../components/menu/menu'

export default class MainView extends View {
    constructor() {
        super();
        this.init();
    }

    init() {
        this._el.classList.add('js-main');
        let content = new Menu({
            el: this._el,
            items: [{
                text: 'play',
                url: '/signin',
                classes: ['button', 'btn', 'btn-play', 'btn-with-shadow']
            }]
        });
        document.querySelector('.app').appendChild(this._el);
    }
}
