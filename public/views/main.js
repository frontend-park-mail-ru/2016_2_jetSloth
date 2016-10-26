(function () {
	'use strict';

	const View = window.View;
	const Main = window.Main;

	class MainView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-main');
			this.hide();
		}

		init() {
		}
		resume() {

			this._component = new Main({
				data: null,
				el: this._el
			});
			this._component.render();
			this._component.subscribe();
			this.show();
		}
	}


	// export
	window.MainView = MainView;

})();
