(function () {
    'use strict';

    const View = window.View;
    const MainMenu = window.MainMenu;

    class MainView extends View {
        constructor(options = {}) {
            super(options);
            this._el = document.querySelector('.js-main');
        }

        init() {
            this._component = new MainMenu(
                {
                    el: this._el
                });
        }

    }

    window.MainView = MainView;
})();