(function () {
	'use strict';

	// import
	//TODO
	const Block = window.Block;
	const Router = window.Router;

	class Main extends Block {
		constructor({data, el}) {
			super('div');
			this.router = new Router();
			this.template = function() {return `<button class="signInButton">Sign In</button>
												<button class="signUpButton">Sign Up</button>
												<button class="ratingButton">rating</button>`};
			this.data = data;
			this._el = el;
		}
		init() {
			}
		render() {
			this._el.innerHTML = this.template();
		}
		subscribe() {
			this._el.onclick = function(event) {
				event.stopPropagation();
				if(event.target.classList.contains("signInButton")) {
					this.router.go('/signIn');
				}
				else if(event.target.classList.contains("signUpButton")) {
					this.router.go('/signUp');
				}
				else if(event.target.classList.contains("ratingButton")) {
					this.router.go('/rating');
				};
				/**/			
			}.bind(this);
		}
	}

	//export
	window.Main = Main;
})();
