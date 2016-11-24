'use strict';

import View from '../modules/view'
import Block from '../components/block/block'
import Menu from '../components/menu/menu'

export default class MainView extends View {
    constructor() {
        super();
    }

    init() {
        this.setClasses(['content', 'js-main']);
        this.background = new Block('img', {
            classes: ['main-background'],
            attrs: {
                src: 'img/back.png'
            }
        });
        this.content = new Menu({
            el: this._el,
            items: [{
                text: 'play',
                url: '/signin',
                classes: ['button', 'btn', 'btn-play', 'btn-with-shadow']
            }]
        });

        this._el.appendChild(this.background._get());

        document.querySelector('.app').appendChild(this._el);
    }
}
