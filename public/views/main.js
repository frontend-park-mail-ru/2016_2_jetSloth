'use strict';

import View from '../modules/view'
import Block from '../components/block/block'
import Menu from '../components/menu/menu'

export default class MainView extends View {
    constructor() {
        super();
    }

    init() {
        this._el.classList.add('content', 'js-main');

        let background = new Block('img', {
            classes: ['main-background'],
            attrs: {
                src: 'img/back.png'
            }
        });
        let content = new Menu({
            el: this._el,
            items: [{
                text: 'play',
                url: '/signin',
                classes: ['button', 'btn', 'btn-play', 'btn-with-shadow']
            }]
        });

        this._el.appendChild(background._get());

        document.querySelector('.app').appendChild(this._el);
    }
}
