'use strict';

import Block from '../../block/block'
import template from './__input.pug'

export default class Input extends Block {
    constructor(options = {}) {
        super('div', {
            classes: ['input__wrap']
        });
        this.data = options;
        this.render();
    }

    render() {
        this._updateHtml();
        this._setItems();
        this._drawLine();
        this._animate();
    }

    _updateHtml() {
        this._el.innerHTML = template(this.data);
    }

    _setItems() {
        this.wrap = this._el.querySelector('.form__input');
        this.field = this._el.querySelector('input');
        this.name = this.field.name;
        this.error = this._el.querySelector('.input__error');
    }

    active() {
        this.setActive();
        this.resetValid();
        this.resetInvalid();
    }

    valid() {
        this.resetInvalid();
        this.setValid();
    }

    invalid(errText) {
        this.resetValid();
        this.setInvalid(errText);
    }

    reset() {
        this.resetActive();
        this.resetValid();
        this.resetInvalid();
        this.resetValue();
    }

    setValid() {
        this.wrap.classList.add('valid');
        this.wrap.style.transformOrigin = "bottom";
    }

    resetValid() {
        this.wrap.classList.remove('valid');
    }

    setInvalid(errText) {
        this.wrap.classList.add('invalid');
        this.wrap.style.transformOrigin = "center";
        this.error.innerHTML = errText;
    }

    resetInvalid() {
        this.wrap.classList.remove('invalid');
        this.error.innerHTML = '';
    }

    setActive() {
        this.wrap.classList.add('active');
    }

    resetActive() {
        this.wrap.classList.remove('active');
    }

    getValue() {
        return this.field.value;
    }

    resetValue() {
        this.field.value = '';
    }

    isEmpty() {
        return this.field.value === '' ? true : false;
    }

    _drawLine() {
        this._line = Snap(this._el.querySelector('.input__line'));
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

    _animate() {
        this.field.addEventListener('focus', () => {
            this.runAnimate();
        })
    }
}
