(function () {
	'use strict';

	const View = window.View;
	const SignIn = window.SignIn;

	class SignInView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-signin');
			this.hide();
		}
		
		init() {
		}
		
		resume(options = {}) {

			this._component = new SignIn({
				el: this._el,
				data: null
			});
			this._component.render();
			this.show();
		}


	}


	// export
	window.SignInView = SignInView;

})();
