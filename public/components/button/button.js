'use strict';

import Block from '../block/block'

export default class Button extends Block {
    constructor(options) {
        super('button', options);
        this._el.innerText = options.text || 'press me';

        this.on('click', () => {
            this.animate();
        });
    }

    animate() {
        return new Promise((resolve, reject) => {
            let duration = 0.3,
                delay = 0.08;
            TweenMax.to(this._el, duration, {
                scaleY: 1.6,
                ease: Expo.easeOut
            });
            TweenMax.to(this._el, duration, {
                scaleX: 1.2,
                scaleY: 1,
                ease: Back.easeOut,
                easeParams: [3],
                delay: delay
            });
            TweenMax.to(this._el, duration * 1.25, {
                scaleX: 1,
                scaleY: 1,
                ease: Back.easeOut,
                easeParams: [6],
                delay: delay * 3
            });

            setTimeout(resolve, 1200);
        });
    }
}
