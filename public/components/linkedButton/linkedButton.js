'use strict';

import Router from '../../modules/router'
import Button from '../button/button'

export default class LinkedButton extends Button {
    constructor(options) {
        super(options);
        this.setLink(options.url);
    }

    setLink(url) {
        this.on('click', () => {
            this.animate()
                .then(() => {
                    (new Router).go(url);
                });
        });
    }
}
