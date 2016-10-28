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

		resume(options = {}) {

			this._component = new Pregame({
				el: this._el,
				data: {
					messages: [],
					username: options.username,
					email: options.email
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
