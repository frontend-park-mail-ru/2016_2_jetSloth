'use strict';

import Button from '../button/button'
import Router from '../../modules/router'

export default class LinkedButton extends Button {
    constructor(options) {
        super(options);
        this.setLink(options.url);
    }

    setLink(url) {
        this.on('click', event => {
            this.animate();
            setTimeout(function() {
                (new Router).go(url);
            }, 1500);
        });
    }
}
