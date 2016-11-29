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
            this.loader()
                .then(() => {
                    (new Router).go(url);
                })
                .then(() => {
                    this.resetLoader();
                })
        })
    }

    loader() {
        return new Promise((resolve, reject) => {
            this._el.disabled = true;
            let loader = document.querySelector('.loader');
            loader.children.forEach = [].forEach;
            let index = 1;
            loader.children.forEach(wave => {
                wave.classList.add(`wave${index++}`);
            })
            setTimeout(resolve, 3000);
        })
    }

    resetLoader() {
        this._el.disabled = false;
        let loader = document.querySelector('.loader');
        loader.children.forEach = [].forEach;
        let index = 1;
        loader.children.forEach(wave => {
            wave.classList.remove(`wave${index++}`);
        })
    }
}
