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

        this.backgroundImg = new Block('img', {
            classes: ['content__background-img', 'main-background-img'],
            attrs: {
                src: 'img/back.png'
            }
        });

        this.menu = new Menu({
            el: this._el,
            items: [{
                text: 'play',
                url: '/signin',
                classes: ['btn', 'btn-play', 'btn-with-shadow']
            }]
        });
        
        this._el.appendChild(this.backgroundImg._get());
        document.querySelector('.app').appendChild(this._el);
    }
}
