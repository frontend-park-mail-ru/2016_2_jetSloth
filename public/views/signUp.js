(function () {
	'use strict';

	const View = window.View;
	const SignUp = window.SignUp;

	class SignUpView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-signup');
			this.hide();
		}
		
		init() {
		}
		
		resume(options = {}) {

			this._component = new SignUp({
				el: this._el,
				data: null
			});
			this._component.render();
			this.show();
		}


	}


	// export
	window.SignUpView = SignUpView;

})();
