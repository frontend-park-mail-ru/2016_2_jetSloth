'use strict';

export default class Block {
    constructor(name, options = {}) {
        this._el = document.createElement(name);
        this._options = options;
        this.setAttrs(options.attrs);
        this.setClasses(options.classes);
    }

    setAttrs(attrs = {}) {
        Object.keys(attrs).forEach(name => {
            this._el.setAttribute(name, attrs[name]);
        });
    }

    setClasses(classes = []) {
        classes.forEach((name) => {
            this._el.classList.add(name);
        });
    }

    renderTo(element) {
        element.appendChild(this._el);
    }

    append(element) {
        if (element instanceof Block) {
            this._el.appendChild(element._get());
        } else {
            this._el.appendChild(element);
        }
    }

    on(type, callback) {
        this._el.addEventListener(type, callback);
    }

    stop(type, callback) {
        this._el.removeEventListener(type, callback);
    }

    toString() {
        return this._el.outerHTML;
    }

    _get() {
        return this._el;
    }
}
