(function () {
	'use strict';

	const View = window.View;
	const Game = window.Game;

	class GameView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-signup');
			this.hide();
		}

		resume(options = {}) {

			this._component = new SignUp({
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
	window.GameView = GameView;

})();
