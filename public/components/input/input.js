'use strict';

import Block from '../block/block'
import template from '../../templates/components/input.pug'

export default class Input extends Block {
    constructor(options = {}) {
        super('div', {
            classes: ['input-wrap']
        });
        this._field = options;
        this.render();
    }

    render() {
        this._updateHtml();
        this._drawLine();
        this._setAnimation();
    }

    _updateHtml() {
        this._el.innerHTML = template(this._field);
    }

    _drawLine() {
        this._line = Snap(this._el.querySelector('.line'));
        this._qCurve = 400 / 2;
        this._textPath = this._line.path("M0 0 " + 400 + " 0");
    }

    runAnimate() {
        setTimeout(() => {
            this._textPath.animate({
                d: "M0 0 Q" + this._qCurve + " 40 " + 400 + " 0"
            }, 150, mina.easeout);
        }, 200);

        setTimeout(() => {
            this._textPath.animate({
                d: "M0 0 Q" + this._qCurve + " -30 " + 400 + " 0"
            }, 150, mina.easeout);
        }, 400);

        setTimeout(() => {
            this._textPath.animate({
                d: "M0 0 " + 400 + " 0"
            }, 200, mina.easein);
        }, 600);
    }

    _setAnimation() {
        let input = this._el.querySelector('input');

        input.addEventListener('focus', () => {
            this.runAnimate();
        });
    }
}
