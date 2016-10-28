(function () {
	'use strict';

	const View = window.View;
	const Pregame = window.Pregame;

	class PregameView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-pregame');
			this.hide();
		}
		init() {
			//this.resume();
		}
		resume(options = {}) {

			this._component = new Pregame({
				el: this._el,
				data: {
					medalists: []
				}
			});
			this._component.render();
			this._component.subscribe();

			this.show();
		}


	}


	// export
	window.PregameView = PregameView;

})();
