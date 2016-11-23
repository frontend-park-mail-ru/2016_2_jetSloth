'use strict';

import View from '../modules/view'


export default class AppView extends View {
    constructor() {
        super();
    }
    init() {
      this._el.classList.add('js-app');
    }

}
