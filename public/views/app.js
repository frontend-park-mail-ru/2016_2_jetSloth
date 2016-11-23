'use strict';

import View from '../modules/view'
import template from '../templates/app.pug'


export default class AppView extends View {
    constructor() {
        super();
    }
    init() {
      this._el.classList.add('content', 'js-app');
      this._el.innerHTML = template();

      document.querySelector('.app').appendChild(this._el);
    }

}
