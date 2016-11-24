'use strict';

import Block from '../block/block'
import template from '../../templates/input.pug'

export default class Input extends Block {
    constructor(options = {}) {
        super('div', {
            classes: ['form-wrap']
        });
        this.fields = options;
        this.render();
    }

    render() {
        this._updateHtml();
        this._drawLine();
        this.animate();
    }

    _updateHtml() {
        this._el.innerHTML = template(this.fields);
    }

    _drawLine() {
        this.svgText = Snap(this._el.querySelector('.line'));
        this.qCurve = 400 / 2;
        this.textPath = this.svgText.path("M0 0 " + 400 + " 0");
    }

    runAnimate() {
        setTimeout(() => {
            this.textPath.animate({
                d: "M0 0 Q" + this.qCurve + " 40 " + 400 + " 0"
            }, 150, mina.easeout);
        }, 200);

        setTimeout(() => {
            this.textPath.animate({
                d: "M0 0 Q" + this.qCurve + " -30 " + 400 + " 0"
            }, 150, mina.easeout);
        }, 400);

        setTimeout(() => {
            this.textPath.animate({
                d: "M0 0 " + 400 + " 0"
            }, 200, mina.easein);
        }, 600);
    }

    animate() {
        let input = this._el.querySelector('input');

        input.addEventListener('focus', event => {
            this.runAnimate();
        });
    }
}
